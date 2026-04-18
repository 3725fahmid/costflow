<template>
  <div>
    <h5 class="label">
      <span v-if="required" class="text-red-600">*</span> {{ label }}
      <span v-if="name && !isValied" class="text-red-600 m-0 ml-2">
        {{ name }} is required
      </span>
    </h5>
    <div class="container">
      <div v-if="options?.length">
        <div class="grid">
          <div
            class="col-12 md:col-3"
            v-for="option in options"
            :key="option.label"
          >
            <label
              :class="`option ${!isValied ? 'error' : ''} `"
              :for="option.label + option.value"
            >
              <Checkbox
                name="option"
                v-model="selectedOptions"
                :inputId="option.label + option.value"
                :trueValue="option.value"
                :value="option.value"
                :disabled="disabled"
                @change="valueChange"
              />
              <span class="ml-2">{{ option.label }}</span>
            </label>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="grid">
          <div class="col-12 md:col-3" v-for="n in 12" :key="n">
            <div class="option">
              <Checkbox disabled />
              <Skeleton class="w-full ml-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type option = {
  label: string;
  value: string | number;
};

// define props
const props = defineProps<{
  name?: string;
  label?: string;
  required?: boolean;
  options: option[] | null;
  values?: number[] | string[];
  disabled?: boolean;
  submit: boolean;
}>();

// define emits
const emits = defineEmits<{
  (e: "onValueChange", values: string[] | number[]): void;
}>();

// define states
const selectedOptions = ref(props.values);

// computed properties
const isValied = computed(() => {
  if (props.required && props.submit) {
    return selectedOptions.value.length !== 0;
  } else return true;
});

// methods
const valueChange = () => {
  emits("onValueChange", selectedOptions.value);
};
</script>

<style scoped>
.label {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;

  display: flex;
  align-items: center;

  color: #3e3e3e;
}

.container {
  padding: 16px;

  background: #f8f8f8;
  border-radius: 4px;
}

.option {
  box-sizing: border-box;

  min-height: 44px;
  padding: 12px 6px;
  margin-top: 12px;

  background: #ffffff;
  opacity: 0.8;
  border-radius: 4px;

  display: flex;
  align-items: center;

  border: 1px solid #ffffff;
  border-radius: 4px;
}

.option:hover {
  border: 1px solid #ff9100;
  border-radius: 4px;
}

.error {
  color: #ff0000;
  border: 1px solid #ff0000;
  border-radius: 4px;
}
</style>
