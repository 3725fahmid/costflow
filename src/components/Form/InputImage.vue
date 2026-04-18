<template>
  <div class="main">
    <div
      v-if="imageShow"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <input
        id="fileInput"
        type="file"
        name="file"
        class="hidden-input"
        accept="image/png, image/jpeg, image/jpg"
        @change="imageChanged"
      />

      <div v-if="image === null" class="dropzone-container">
        <label for="fileInput" class="file-label">
          <div>
            <img :src="imageUrl" alt="image not found" />
          </div>
          <div v-if="isDragging">Release to drop files here.</div>
          <div v-else>
            <u class="image-upload">Upload a file</u> or drag and drop
          </div>
          <p class="image-format">PNG, JPG, JPEG, GIF up to 20MB</p>
        </label>
      </div>

      <div v-else-if="image !== null" class="preview-container">
        <div class="preview-card">
          <Image
            :src="image.data ?? image"
            height="50"
            class="preview-img w-full"
            preview
          />
          <div class="">
            <Button
              :onclick="deleteImage"
              icon="pi pi-times"
              class="p-button-rounded p-button-danger p-button-text remove-img"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref } from "vue";

interface ImageData {
  data: string | null | ArrayBuffer;
  name: string;
  size: number;
  type: string;
}

const image: Ref<null | ImageData | string> = ref(null);
const imageFile: Ref<null | File | ImageData> = ref(null);
const imageShow = ref(true);
const isDragging = ref(false);

const props = defineProps<{
  value?: ImageData | string;
  required?: boolean;
  imageType?: string;
  imageUrl: string;
}>();

const emits = defineEmits(["imageChange"]);

// methods
const fileToUrlConverter = (file: File | ImageData): Promise<ImageData> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      return resolve({
        data: fileReader.result,
        name: file.name,
        size: file.size,
        type: file.type,
      });
    };

    fileReader.readAsDataURL(file);
  });
};
const imageChanged = async (event: { target: { files: File[] } }) => {
  imageShow.value = false;

  image.value = await fileToUrlConverter(event.target.files[0]);
  imageFile.value = event.target.files[0];

  await nextTick();

  imageShow.value = true;
  emits("imageChange", imageFile.value);
};

const deleteImage = () => {
  image.value = null;
  imageFile.value = null;
  emits("imageChange", imageFile.value);
};

const dragover = (e) => {
  e.preventDefault();
  isDragging.value = true;
};

const dragleave = () => {
  isDragging.value = false;
};

const drop = async (e: {
  preventDefault: () => void;
  dataTransfer: { files: (File | ImageData | null)[] };
}) => {
  e.preventDefault();
  imageShow.value = false;
  image.value = await fileToUrlConverter(e.dataTransfer.files[0]);
  imageFile.value = e.dataTransfer.files[0];
  emits("imageChange", imageFile.value);

  await nextTick();

  imageShow.value = true;
  isDragging.value = false;
};

onMounted(async () => {
  if (typeof props.value === "string") {
    image.value = props.value;
  }

  if (
    props.value &&
    typeof props.value === "object" &&
    !Array.isArray(props.value)
  ) {
    image.value = await fileToUrlConverter(props.value);
    imageFile.value = props.value;
  }
});

onUpdated(async () => {
  if (props.value && !image.value) {
    image.value =
      typeof props.value === "string"
        ? props.value
        : await fileToUrlConverter(props.value);
  }
});
</script>

<style lang="scss" scoped>
.main {
  align-items: center;
  justify-content: center;
  text-align: center;

  .hidden-input {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
  }

  .dropzone-container {
    padding: 1rem;
    background: #fdfdfd;
    border: 0.1px dashed #757575;
    border-radius: 4px;

    .file-label {
      font-size: 15px;
      display: block;
      cursor: pointer;
    }

    .image-upload {
      color: #f58400;
    }

    .image-format {
      top: 887px;
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 24px;
      color: #7c7c7c;
    }
  }
  .preview-container {
    display: flex;
    margin-top: 1rem;

    .preview-card {
      display: flex;
      border: 1px solid #a2a2a2;
      padding: 5px;
      margin-left: 5px;
    }

    .preview-img {
      width: 50px;
      height: 50px;
      border-radius: 5px;
      border: 1px solid #a2a2a2;
      background-color: #a2a2a2;
    }
    .remove-img {
      display: contents;
    }
  }
}
</style>
