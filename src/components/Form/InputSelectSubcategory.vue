<template>
  <div>
    <h5 v-if="label" class="label label-sm md:label-md">
      <span v-if="required" class="text-red-600">*</span>{{ label }}
    </h5>

    <div class="mt-2 grid background-1 p-5 border-round-2xl">
      <div class="col-6">
        <h6 v-if="categoryName" class="label label-xsm md:label-md">
          Select {{ categoryName }}
        </h6>
        <div class="category-list">
          <div v-if="loading" class="">
            <div v-for="n in 5" :key="n" class="category my-3">
              <h3
                class="category-name p-0 m-0 ml-2 flex align-items-center justify-content-start"
              >
                <Skeleton :class="'mb-2 w-' + getRandomInt(10, 30) + 'rem'" />
              </h3>
              <h5
                class="meta-data ml-2 flex align-items-center justify-content-start"
              >
                <Skeleton :class="'mb-2 w-6rem'" />
              </h5>
            </div>
          </div>

          <div v-else-if="options?.length" class="">
            <div
              v-for="(Option, index) in options"
              :key="Option.label + index"
              :class="[
                'category my-2 ml-3',
                SelectedCategoryIndex === index ? 'active' : '',
              ]"
              @click="categorySelect(index, Option)"
            >
              <h3
                class="category-name p-0 m-0 ml-2 flex align-items-center justify-content-start"
              >
                {{ Option.label }}
              </h3>
              <h5
                class="meta-data ml-2 flex align-items-center justify-content-start"
              >
                Selected
                {{ countOccurrences.get(Option.id) ?? 0 }}
                / {{ Option?.SubCategorys?.length }}
              </h5>
            </div>
          </div>

          <div
            v-else-if="!options?.length"
            class="ml-2 md:ml-5 p-1 md:p-5 border-round-2xl flex flex-column align-items-center justify-content-center"
          >
            <img
              src="/images/icons/no-result.png"
              alt=""
              srcset=""
              class="h-16rem"
            />
            <h5>No {{ categoryName ?? "Content" }} Found</h5>
          </div>
        </div>
      </div>
      <div class="col-6">
        <h6 v-if="subCategoryName" class="label label-xsm md:label-md ml-5">
          {{ subCategoryName }}
        </h6>
        <div
          v-if="subcategoryLoading"
          class="bg-white ml-5 p-2 md:p-5 border-round-2xl subcategory-list"
        >
          <div
            v-for="n in 5"
            :key="n"
            class="flex align-items-center justify-content-between my-3"
          >
            <Skeleton class="mb-2 skeleton-line" />
          </div>
        </div>
        <div
          v-else-if="subCategorys?.length"
          class="bg-white ml-5 p-2 md:p-5 border-round-2xl subcategory-list"
        >
          <div
            v-for="(subcategory, index) in subCategorys"
            :key="subcategory.label + index"
            class="subcategory flex align-items-center justify-content-between my-3"
            @click="subcategorySelect(subcategory.id)"
          >
            <img
              v-if="SelectedData.includes(subcategory.id)"
              src="/images/icons/check.svg"
              alt=""
            />

            <img v-else src="/images/icons/circle.svg" alt="" />

            <div class="ml-2">
              <h3 class="category-name p-0 m-0">{{ subcategory.label }}</h3>
            </div>
          </div>
        </div>

        <div
          v-else-if="!subCategorys?.length"
          class="subcategory-list-empty bg-white ml-5 p-5 border-round-2xl flex flex-column align-items-center justify-content-center"
        >
          <img
            src="/images/icons/no-result.png"
            alt=""
            srcset=""
            class="h-16rem"
          />
          <h5>No {{ subCategoryName ? subCategoryName : "Content" }} Found</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRandomInt } from "~~/src/helpers/utils";

interface SubCategory {
  id: number;
  label: string;
}

interface Category {
  label: string;
  id?: number;
  SubCategorys?: SubCategory[];
}
// define props
const props = defineProps<{
  label: string;
  required: boolean;
  disabled?: boolean;
  options?: Category[] | null;
  loading?: boolean;
  categoryName?: string;
  subCategoryName?: string;
  values?: number[];
}>();

// define events
const emits = defineEmits<{
  (e: "onValueChange", value: number[]): void;
}>();

// states
const SelectedCategoryIndex = ref(0);
const SelectedCategoryId = ref();
const SelectedCategorys = ref([] as number[]);
const subCategorys = ref([] as SubCategory[] | undefined);
const subcategoryLoading = ref(false);
const SelectedData = ref([] as number[]);
const firstUpdate = ref(true);

// methods and life-cycle hooks
const categorySelect = (index: number, Option: Category) => {
  SelectedCategoryIndex.value = index;
  SelectedCategoryId.value = Option.id;

  subcategoryLoading.value = true;
  setTimeout(() => {
    subCategorys.value = Option.SubCategorys;
    subcategoryLoading.value = false;
  }, 500);
};

const subcategorySelect = (id: number) => {
  if (SelectedData.value.includes(id)) {
    SelectedData.value = SelectedData.value.filter((value) => {
      return value !== id;
    });
    const index = SelectedCategorys.value.indexOf(SelectedCategoryId.value);
    if (index > -1) {
      SelectedCategorys.value.splice(index, 1);
    }
  } else {
    SelectedData.value.push(id);
    SelectedCategorys.value.push(SelectedCategoryId.value);
  }

  emits("onValueChange", SelectedData.value);
};

const countOccurrences = computed(() => {
  const counts = new Map();

  for (let i = 0; i < SelectedCategorys.value.length; i++) {
    if (counts.has(SelectedCategorys.value[i])) {
      counts.set(
        SelectedCategorys.value[i],
        counts.get(SelectedCategorys.value[i]) + 1
      );
    } else {
      counts.set(SelectedCategorys.value[i], 1);
    }
  }

  return counts;
});

const insertOccurrences = () => {
  props.values?.forEach((subcategoryId) => {
    props.options?.forEach((category) => {
      const subCategoryInstance = category.SubCategorys?.filter(
        (subCategory) => subCategory.id === subcategoryId
      );

      if (subCategoryInstance?.length) {
        SelectedCategorys.value.push(category.id);
      }
    });
  });
};

onMounted(() => {
  if (props.values) {
    SelectedData.value = props.values;
  }
});

onUpdated(() => {
  if (firstUpdate.value && props?.options?.length) {
    SelectedCategoryId.value = props?.options[0]?.id;
    firstUpdate.value = false;

    if (props.values?.length) insertOccurrences();
  }
});
</script>

<style scoped lang="scss">
.label {
  /* min-height: 27px; */

  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  /* line-height: 27px; */

  display: flex;
  align-items: center;

  color: #3e3e3e;
}

.label-xsm {
  font-size: 12px;
}
.label-sm {
  font-size: 16px;
}

.label-md {
  font-size: 18px;
}

.background-1 {
  background-color: var(--surface-ground);
}

.category-list {
  height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
  direction: rtl;
}

.category-list::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(233, 233, 233, 0.3);
  background-color: #f5f5f5;
}

.category-list::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}

.category-list::-webkit-scrollbar-thumb {
  background-color: #e4e4e4;
  border: 2px solid #e4e4e4;
  border-radius: 5px;
}

.subcategory-list {
  height: 400px;
  overflow-x: hidden;
  overflow-y: scroll;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.subcategory-list-empty {
  height: 400px;
}

.category {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 0.8rem;

  padding: 0.8rem;
  cursor: pointer;
  direction: ltr;

  box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 1px 0 rgba(0, 0, 0, 0.12);
}

.active {
  // border-left: 1rem solid #607d8b;
  border-left: 1rem solid var(--primary-color);
  color: #ffffff;
  background-color: rgb(245, 132, 0, 0.9);
}

.subcategory {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: var(--surface-ground);
  border-radius: 0.8rem;

  padding: 0.8rem;
  cursor: pointer;
}

.skeleton-line {
  background: rgba(130, 130, 130, 0.2);
  padding: 0.8rem;
  cursor: pointer;
  background-color: rgba(130, 130, 130, 0.2);
  border-radius: 0.8rem;
}

.subcategory-list::-webkit-scrollbar {
  display: none;
}

.subcategory-list::-webkit-scrollbar-thumb {
  background-color: #e4e4e4;
  border: 2px solid #e4e4e4;
  border-radius: 5px;
}

.category-name {
  font-size: 1rem;
  // margin-bottom: 1rem;
}

.meta-data {
  height: 18px;
  margin: 0px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 0.8rem;
  line-height: 18px;

  display: flex;
  align-items: center;
}
</style>
