<template>
  <div class="w-full">
    <p class="input-label">
      <span v-if="props.required" class="text-red-400 font-bold">*</span>
      <span>{{ props.title }}</span>
    </p>

    <div :class="'container p-0'">
      <div
        class="flex flex-wrap gap-1 pb-1 px-2 bg-bluegray-50 relative button-container"
      >
        <Button
          :class="'border-none outline-none p-button-outlined p-button-secondary  p-2'"
          :disabled="disabled"
          @click="applyStyle('bold')"
        >
          𝐁
        </Button>

        <Button
          :class="'border-none outline-none p-button-outlined p-button-secondary  p-2 '"
          :disabled="disabled"
          @click="applyStyle('italic')"
        >
          𝙄
        </Button>

        <Button
          :class="'border-none outline-none p-button-outlined p-button-secondary font-bold p-2'"
          :disabled="disabled"
          @click="applyStyle('underline')"
        >
          U̲
        </Button>

        <Button
          v-if="!minimalToolbar"
          label="H"
          :class="'border-none outline-none p-button-outlined p-button-secondary  p-2'"
          :disabled="disabled"
          @click="applyStyle('heading')"
        />

        <Button
          v-if="!minimalToolbar"
          icon="pi pi-list"
          :class="'border-none outline-none p-button-outlined p-button-secondary  p-2'"
          :disabled="disabled"
          @click="applyStyle('insertUnorderedList')"
        />

        <Button
          v-if="!minimalToolbar"
          class="border-none outline-none p-button-outlined p-button-secondary p-2"
          :disabled="disabled"
          @click="applyStyle('insertOrderedList')"
        >
          <img
            height="15"
            :src="'/images/icons/order-list.svg'"
            alt=""
            srcset=""
          />
        </Button>

        <div
          class="dropdown border-none outline-none p-button-outlined p-button-secondary"
        >
          <Button
            v-if="!minimalToolbar"
            icon="pi pi-align-left"
            :class="'border-none outline-none p-button-outlined p-button-secondary'"
            :disabled="disabled"
          />

          <div class="dropdown-content">
            <Button
              v-if="!minimalToolbar"
              icon="pi pi-align-left"
              :class="'border-none outline-none p-button-outlined p-button-secondary'"
              :disabled="disabled"
              @click="applyStyle('justifyLeft')"
            />
            <Button
              v-if="!minimalToolbar"
              icon="pi pi-align-right"
              :class="'border-none outline-none p-button-outlined p-button-secondary'"
              :disabled="disabled"
              @click="applyStyle('justifyRight')"
            />
            <Button
              v-if="!minimalToolbar"
              icon="pi pi-align-justify"
              :class="'border-none outline-none p-button-outlined p-button-secondary'"
              :disabled="disabled"
              @click="applyStyle('justifyFull')"
            />
            <Button
              v-if="!minimalToolbar"
              icon="pi pi-align-center"
              :class="'border-none outline-none p-button-outlined p-button-secondary'"
              :disabled="disabled"
              @click="applyStyle('justifyCenter')"
            />
          </div>
        </div>

        <Button
          :class="'border-none outline-none p-button-outlined p-button-secondary font-bold p-2'"
          :disabled="disabled"
          @click="applyMath"
        >
          <span data-atom-id="khdmd" class="ML__base flex align-items-center">
            <span
              data-atom-id="pf1j8p"
              class="ML__mathit"
              style="margin-right: 0.11em"
            >
              f
            </span>
            <span data-atom-id="lk1062" class="left-right">
              <span data-atom-id="lk1062" class="ML__small-delim ML__open">
                <span>(</span>
              </span>
              <span>
                <span data-atom-id="lk229r"></span>
                <span data-atom-id="lk80e" class="ML__mathit">x</span>
              </span>
              <span data-atom-id="lk1062" class="ML__small-delim ML__close">
                <span>)</span>
              </span>
            </span>
          </span>
        </Button>
      </div>

      <div
        ref="inputValue"
        :contenteditable="disabled ? false : true"
        :class="`wysiwyg-output-${name} outline-none border-0 p-4 rounded-lg border-gray-200 input-container`"
        @input="onInput"
        v-html="innerValue"
      />
    </div>

    <QuestionFormMathLive
      :display="displayFormulaModal"
      @close="closeModal"
      @insert="insertMath"
    />
  </div>
</template>

<script lang="ts" setup>
import { Marked } from "@ts-stack/markdown";
import TurndownService from "turndown";

// define props
const props = defineProps<{
  name: string;
  title: string;
  value?: string | null;
  minimalToolbar?: boolean;
  required: boolean;
  disabled?: boolean;
}>();

// Define events
const emits = defineEmits<{
  (e: "valueChange", value: string): void;
}>();

// Define Hooks
const turndownService = new TurndownService();

turndownService.addRule("strikethrough", {
  filter: ["u"],
  replacement: function (content: string) {
    return "<u>" + content + "</u>";
  },
});

// States
const inputValue = ref("");
const displayFormulaModal = ref(false);
const innerValue = ref("");
const haveValue = ref(false);

// methods

const applyMath = () => {
  displayFormulaModal.value = true;
};

const closeModal = () => {
  displayFormulaModal.value = false;
};

const insertMath = (value: string) => {
  displayFormulaModal.value = false;

  const editarea = document.querySelector(".wysiwyg-output-" + props.name);

  const span = document.createElement("span");

  span.innerHTML = " $$ " + value + " $$ ";

  editarea?.appendChild(span);

  valueChanged();
};

const applyStyle = (command: string) => {
  document.querySelector(".wysiwyg-output-" + props.name)?.focus();

  if (command === "heading") document.execCommand("formatBlock", false, "<h1>");
  else document.execCommand(command);
};

const onInput = () => {
  if (inputValue.value?.innerHTML?.length) haveValue.value = true;
  else haveValue.value = false;
  valueChanged();
};

const valueChanged = () => {
  const value = inputValue.value.innerHTML;

  const markdown = turndownService.turndown(value);
  emits("valueChange", markdown);
};

onMounted(() => {
  document.execCommand("defaultParagraphSeparator", false, "p");
  innerValue.value = props.value !== null ? Marked.parse(props.value) : "";
});

onUpdated(() => {
  if (
    props.value &&
    !innerValue.value &&
    props.value !== inputValue.value.innerHTML
  ) {
    innerValue.value = props.value !== "null" ? Marked.parse(props.value) : "";
  }
});
</script>

<style lang="scss" scoped>
.container {
  border: 1px solid #ebe9e9;
  border-radius: 12px;
  box-shadow: 1px;
  min-height: 100px;

  .button-container {
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
  }

  .input-container {
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
  }
}

.wysiwyg-output h1 {
  @apply text-2xl;
  @apply font-bold;
  @apply pb-4;
}
.wysiwyg-output p {
  @apply pb-4;
}
.wysiwyg-output p {
  @apply pb-4;
}
.wysiwyg-output ul {
  @apply ml-6;
  @apply list-disc;
}
.wysiwyg-output ol {
  @apply ml-6;
  @apply list-decimal;
}

.input-label {
  height: 27px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  /* identical to box height */

  display: flex;
  align-items: center;

  color: #3e3e3e;
  margin-bottom: 8px;
}

@media only screen and (max-width: 1350px) {
  .input-label {
    font-weight: 500;
    font-size: 12px;
  }
}

.mt-16 {
  margin-top: 16px;
}

.math-icon {
  filter: invert(20%) sepia(10%) hue-rotate(86deg) brightness(250%);
}

.align-button-container {
  position: relative;
}

.dropdown {
  position: relative;
  display: inline-block;
  padding-top: 1px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  // min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}
</style>
