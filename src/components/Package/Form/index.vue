<template>
  <div
    class="card-container p-3 md:p-5 flex flex-column align-content-between justify-content-between"
  >
    <div>
      <div class="form-title w-full">{{ formTitle }}</div>
      <CommonMultiStepForm
        :items="formSteps"
        :current-step="1"
        :form-page="formPage"
      />
      <div
        v-if="renderForm"
        class="flex flex-column align-items-between justify-content-center"
      >
        <div class="form-body mt-3">
          <div v-show="formPage === 1" class="grid">
            <FormInputText
              class="col-12"
              :label="'Name'"
              :required="true"
              :value="modeltestPackage.name"
              :disabled="store.loading"
              @on-value-change="(value) => (modeltestPackage.name = value)"
            />

            <div class="col-12">
              <FormInputCustomEditor
                :name="'Summary'"
                :title="'Summary'"
                :value="modeltestPackage.summary"
                :disabled="store.loading"
                :required="false"
                :minimal-toolbar="false"
                @value-change="(value) => (modeltestPackage.summary = value)"
              />
            </div>

            <div class="col-12">
              <FormInputCustomEditor
                :name="'Details'"
                :title="'Details'"
                :value="modeltestPackage?.details"
                :disabled="store.loading"
                :required="false"
                :minimal-toolbar="false"
                @value-change="(value) => (modeltestPackage.details = value)"
              />
            </div>

            <FormInputImage
              class="col-12"
              image-url="/images/icons/imagePreviewIcon.svg"
              :value="modeltestPackage.cover"
              :required="false"
              @image-change="(value) => (modeltestPackage.cover = value)"
            />
          </div>
          <div v-show="formPage === 2" class="grid">
            <FormInputCurriculum
              class="col-12 md:col-6"
              :type="packageType"
              :label="'Select Curriculum'"
              :placeholder="'Select Curriculum'"
              :required="true"
              :disabled="store.loading"
              :value="modeltestPackage.curriculum_id"
              @on-value-change="
                (value) => (modeltestPackage.curriculum_id = value)
              "
            />

            <FormInputSession
              class="col-12 md:col-6"
              :label="'Select Session'"
              :required="true"
              :disabled="store.loading"
              :curriculum-id="modeltestPackage.curriculum_id"
              :value="modeltestPackage.session_id"
              @on-value-change="
                (value) => (modeltestPackage.session_id = value)
              "
            />
            <div v-if="packageType === 'topic'" class="col-12">
              <PackageFormInputSubject
                :value="modeltestPackage.subjects[0]"
                :curriculum-id="modeltestPackage.curriculum_id"
                :disabled="!modeltestPackage.curriculum_id"
                :required="true"
                @on-value-change="subjectChangeHandler"
              />
              <CommonMultiSelectList
                class="mt-3"
                :name="'Model Tests'"
                :label="'Model Tests'"
                :values="modeltestPackage.general_model_tests"
                :options="generalModeltestOptions"
                :required="true"
                :disabled="!modeltestPackage.subjects.length"
                @on-value-change="generalModelTestValueChange"
              />
            </div>
            <div v-if="packageType === 'general'" class="col-12">
              <TabView class="p-0 tab-view mt-2">
                <TabPanel :header="'General Modeltest'">
                  <div class="grid">
                    <CommonMultiSelectDropdown
                      class="col-12"
                      :name="'Subject'"
                      :label="'Subjects'"
                      :placeholder="'Select general model tests subjects'"
                      :options="subjectOptions"
                      :values="modeltestPackage.subjects"
                      :required="true"
                      :disabled="!modeltestPackage.curriculum_id"
                      @on-value-change="
                        (value) => (modeltestPackage.subjects = value)
                      "
                    />
                    <CommonMultiSelectList
                      class="col-12"
                      :name="'Model Tests'"
                      :label="'Model Tests'"
                      :values="modeltestPackage.general_model_tests"
                      :options="generalModeltestOptions"
                      :required="true"
                      :disabled="!modeltestPackage.subjects.length"
                      @on-value-change="generalModelTestValueChange"
                    />
                  </div>
                </TabPanel>
                <TabPanel
                  header="Subject-wise Modeltest"
                  class="w-full p-5 m-5"
                  :disabled="
                    !modeltestPackage.curriculum_id ||
                    !modeltestPackage.session_id ||
                    store.loading
                  "
                >
                  <FormInputSelectSubcategory
                    :label="'Select Model Test'"
                    :required="true"
                    :options="subjectModeltestOptions"
                    :loading="store.loading"
                    :category-name="'Subject'"
                    :sub-category-name="'Model Test'"
                    :values="modeltestPackage.subject_model_tests"
                    @on-value-change="
                      (value) => (modeltestPackage.subject_model_tests = value)
                    "
                  />
                </TabPanel>
              </TabView>
            </div>
          </div>

          <div v-show="formPage === 3" class="grid">
            <FormInputDate
              :name="'Valid Till'"
              :label="'Valid Till'"
              :place-holder="'Select Date'"
              :required="true"
              :disabled="store.loading"
              :value="modeltestPackage.valid_till"
              :show-time="true"
              :min-date="new Date()"
              class="col-12 md:col-3"
              @on-value-change="
                (value) => (modeltestPackage.valid_till = value)
              "
            />

            <FormInputNumber
              :name="'Prices'"
              :label="'Prices'"
              :placeholder="'Select Prices'"
              :value="modeltestPackage.price"
              :required="true"
              class="col-12 md:col-2"
              @on-value-change="(value) => (modeltestPackage.price = value)"
            />

            <FormInputNumber
              :name="'Regular Prices'"
              :label="'Regular Prices'"
              :placeholder="'Select Regular Prices'"
              :value="modeltestPackage.regular_price"
              :required="true"
              class="col-12 md:col-3"
              @on-value-change="
                (value) => (modeltestPackage.regular_price = value)
              "
            />

            <FormInputCheckbox
              :name="'Show Regular Price'"
              :label="'Show Regular Price'"
              :value="modeltestPackage?.show_regular_price"
              class="col-12 md:col-3"
              @on-value-change="
                (value) => (modeltestPackage.show_regular_price = value)
              "
            />
            <PackageFormInputMultiPrice
              class="col-12"
              :initial-prices="modeltestPackage?.multiPrices"
              @on-value-change="(value) => onPriceChange(value)"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-content-end mt-8">
      <Button
        icon="pi pi-refresh"
        label="Reset"
        class="p-button-danger"
        style="margin-right: 12px"
        :disabled="store.loading || disableResetButton"
        @click="() => emits('onReset')"
      />

      <FormNavigator
        :current-page="formPage"
        :total-steps="3"
        :disable-next-button="disableNextButton"
        @page-change="formPageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useStore } from "~~/src/stores/store";
import { formSteps } from "~~/constants/form-options";
import { useSubjectStore } from "~~/src/stores/subject.store";
import SubjectService from "~~/src/services/Subject.Service";
import ModelTestService from "~~/src/services/ModelTest.Service";
import { Price } from "~~/contracts/api-constracts/common-contracts";
import { Package } from "~~/contracts/api-constracts/package-contracts";
import { ModelTestContract } from "~~/contracts/api-constracts/modeltest-contract";

// define props
const props = defineProps<{
  formTitle: string;
  initialValue?: Package;
  packageType: string;
}>();

// define events
const emits = defineEmits<{
  (e: "onSubmit", value: Package): void;
  (e: "onReset"): void;
}>();

// define hooks
const store = useStore();
const toast = useToast();
const subjectStore = useSubjectStore();

// define states
const renderForm = ref(true);
const formPage = ref(1);
// const filteredData = ref([]);

const modeltestPackage = ref({
  name: null as string | null | undefined,
  summary: null as string | null,
  details: null as string | null,
  cover: null as string | null | File,

  curriculum_id: null as null | number,
  session_id: null as null | number | string,
  subjects: [] as number[] | string[],
  general_model_tests: [] as number[] | string[],
  subject_model_tests: [] as number[],

  valid_till: null as string | number | null,
  price: null as number | string | null,
  regular_price: null as null | number | string,
  show_regular_price: true,
  multiPrices: [] as Price[] | string,
});

const filteredModeltest = ref([]);
const allModelTest: Ref<ModelTestContract[]> = ref([]);

// computed property

const pivotData = computed(() => {
  return generalModeltestOptions.value.map(({ metaTag }) =>
    metaTag.map(({ pivot }) => pivot)
  );
});
const filteredData = computed(() => {
  return pivotData.value
    .flat()
    .filter((obj) => {
      return modeltestPackage.value.subjects.includes(obj.subject_id);
    })
    .map((obj) => obj.model_test_id);
});

const subjectOptions = computed(() => {
  if (!modeltestPackage.value.curriculum_id) return [];

  const subjectsOption = subjectStore.subjects.filter(
    (subject: { curriculum_id: number }) =>
      subject.curriculum_id === modeltestPackage.value.curriculum_id
  );

  return subjectsOption?.map((subject) => {
    return {
      label: subject?.name,
      value: subject?.id,
    };
  });
});

const generalModeltestOptions = computed(() => {
  return filteredModeltest.value
    .filter((modeltest) => modeltest.subjects.length !== 0)
    .map((modelTest: { name: string; id: number; subjects: object[] }) => {
      return {
        label: modelTest?.name,
        value: modelTest?.id,
        metaTag: modelTest?.subjects,
      };
    });
});

const subjectModeltestOptions = computed(() => {
  const allSubjects = subjectStore
    .getSubjectByCurriculumId(modeltestPackage.value.curriculum_id as number)
    .map((subject) => {
      return {
        id: subject.id,
        label: subject.name,
        SubCategorys: [] as { id: number; label: string }[],
      };
    });
  allModelTest.value
    .filter((test) => test.subjects.length === 1)
    .forEach((test) => {
      const subjectId = test.subjects[0].id;

      const matchingSubject = allSubjects.find(
        (subject) => subject.id === subjectId
      );

      if (matchingSubject) {
        const category = { id: test.id, label: test.name };
        matchingSubject.SubCategorys.push(category);
      }
    });

  return allSubjects;
});

const disableResetButton = computed(() => {
  if (props.initialValue) {
    const isPageOneChange =
      props.initialValue?.name.trim() === modeltestPackage.value.name?.trim() &&
      props.initialValue?.summary?.trim() ===
        modeltestPackage.value.summary?.trim() &&
      props.initialValue?.details?.trim() ===
        modeltestPackage.value.details?.trim() &&
      props.initialValue.cover === modeltestPackage.value.cover;
    const isSecondPageChange =
      props.packageType === "topic"
        ? props.initialValue.curriculum_id ===
            modeltestPackage.value.curriculum_id &&
          props.initialValue.session_id === modeltestPackage.value.session_id &&
          JSON.stringify(modeltestPackage.value.general_model_tests) ===
            JSON.stringify(
              props.initialValue.model_tests.general.map(
                (modeltest) => modeltest.model_test_id
              )
            )
        : props.initialValue.curriculum_id ===
            modeltestPackage.value.curriculum_id &&
          props.initialValue.session_id === modeltestPackage.value.session_id &&
          JSON.stringify(
            props.initialValue.subjects.map((subject) => subject.id)
          ) === JSON.stringify(modeltestPackage.value.subjects) &&
          JSON.stringify(modeltestPackage.value.general_model_tests) ===
            JSON.stringify(
              props.initialValue.model_tests.general.map(
                (modeltest) => modeltest.model_test_id
              )
            ) &&
          JSON.stringify(modeltestPackage.value.subject_model_tests) ===
            JSON.stringify(
              props.initialValue.model_tests.subject.map(
                (modeltest) => modeltest.model_test_id
              )
            );
    if (formPage.value === 3) {
      return disableNextButton.value;
    }
    return isPageOneChange && isSecondPageChange;
  }
  if (formPage.value === 1) {
    return !(
      modeltestPackage.value.name ||
      modeltestPackage.value.summary ||
      modeltestPackage.value.details ||
      modeltestPackage.value.cover
    );
  }
  if (formPage.value === 2) {
    if (props.packageType === "topic") {
      return !(
        modeltestPackage.value.curriculum_id ||
        modeltestPackage.value.session_id ||
        modeltestPackage.value.subjects.length ||
        modeltestPackage.value.general_model_tests.length
      );
    }
    return !(
      modeltestPackage.value.curriculum_id ||
      modeltestPackage.value.session_id ||
      modeltestPackage.value.subjects.length ||
      modeltestPackage.value.general_model_tests.length ||
      modeltestPackage.value.subject_model_tests.length
    );
  }
  if (formPage.value === 3) {
    return !(
      modeltestPackage.value.price ||
      modeltestPackage.value.regular_price ||
      modeltestPackage.value.valid_till ||
      modeltestPackage.value.multiPrices.length ||
      !modeltestPackage.value.show_regular_price
    );
  }
});
const disableNextButton = computed(() => {
  if (formPage.value === 1) {
    return !(
      modeltestPackage.value.name &&
      modeltestPackage.value.summary &&
      modeltestPackage.value.details &&
      modeltestPackage.value.cover
    );
  }

  if (formPage.value === 2) {
    if (props.packageType === "topic") {
      return !(
        modeltestPackage.value.curriculum_id &&
        modeltestPackage.value.session_id &&
        modeltestPackage.value.subjects.length &&
        modeltestPackage.value.general_model_tests.length
      );
    }
    return !(
      modeltestPackage.value.curriculum_id &&
      modeltestPackage.value.session_id &&
      modeltestPackage.value.subjects.length &&
      modeltestPackage.value.general_model_tests.length &&
      modeltestPackage.value.subject_model_tests.length
    );
  }

  if (formPage.value === 3) {
    if (props.initialValue) {
      return (
        disableResetButton.value &&
        props.initialValue.price === modeltestPackage.value.price &&
        props.initialValue.regular_price ===
          modeltestPackage.value.regular_price &&
        props.initialValue.valid_till === modeltestPackage.value.valid_till &&
        props.initialValue.show_regular_price ===
          modeltestPackage.value.show_regular_price &&
        modeltestPackage.value.curriculum_id &&
        JSON.stringify(props.initialValue.multiPrices) ===
          JSON.stringify(modeltestPackage.value.multiPrices)
      );
    }

    return (
      !modeltestPackage.value.price ||
      !modeltestPackage.value.regular_price ||
      !modeltestPackage.value.valid_till
    );
  }
});

// methods and life-cycle hooks
const onPriceChange = (value: Price[]) => {
  modeltestPackage.value.multiPrices = [...value];
};

const formPageChange = (page: number) => {
  if (page > 0 && page !== 4) {
    formPage.value = page;
  } else if (page === 4) {
    if (typeof modeltestPackage.value.multiPrices === "object") {
      modeltestPackage.value.multiPrices = JSON.stringify(
        modeltestPackage.value.multiPrices.map((price) => {
          if (price.id && price.id < 0) price.id = undefined;
          return price;
        })
      );
    }
    emits("onSubmit", modeltestPackage.value);
  }
};

const setIntitialValue = async () => {
  if (props.initialValue) {
    modeltestPackage.value = {
      name: props.initialValue.name,
      details: props.initialValue.details,
      summary: props.initialValue.summary,
      cover: props.initialValue.cover,

      curriculum_id: props.initialValue.curriculum_id,
      session_id: props.initialValue.session_id,
      subjects: props.initialValue.subjects.map((subject) => subject.id),
      general_model_tests: props.initialValue.model_tests.general.map(
        (modeltest) => modeltest.model_test_id
      ),
      subject_model_tests: [],
      valid_till: props.initialValue.valid_till,
      price: props.initialValue.price,
      regular_price: props.initialValue.regular_price,
      show_regular_price: props.initialValue.show_regular_price,
      multiPrices: [...props.initialValue.multiPrices],
    };
    if (props.packageType === "general") {
      modeltestPackage.value.subject_model_tests =
        props.initialValue.model_tests.subject.map(
          (modeltest) => modeltest.model_test_id
        );
    }
    if (props.packageType === "topic") {
      modeltestPackage.value.subjects = allModelTest.value
        .filter((modeltest) =>
          modeltestPackage.value.general_model_tests.includes(modeltest.id)
        )
        .map((modelTest) => modelTest.subjects[0].id);
    }

    renderForm.value = false;
    await nextTick();
    renderForm.value = true;

    return;
  }

  renderForm.value = false;
  await nextTick();
  renderForm.value = true;
};

const fetchSubjects = async () => {
  store.loading = true;
  const response = await SubjectService.fetch("pagination=false");
  store.loading = false;

  if (!response.success) {
    toast.add({
      severity: "error",
      summary: "Error!",
      detail: response.message,
      life: 3000,
    });

    return;
  }

  subjectStore.setSubjects(response.data);
};

const fetchModeltests = async () => {
  store.loading = true;
  const response = await ModelTestService.fetch(
    "pagination=false&unique=" + (!props.initialValue ? 1 : 0)
  );
  store.loading = false;

  if (!response.success) {
    toast.add({
      severity: "error",
      summary: "Error!",
      detail: response.message,
      life: 3000,
    });

    return;
  }

  allModelTest.value = response.data;
};

const generalModelTestValueChange = (value) => {
  modeltestPackage.value.general_model_tests = filteredData.value.filter(
    (modelTestId) => value.includes(modelTestId)
  );
};
const subjectChangeHandler = (value) => {
  modeltestPackage.value.subjects = [];
  modeltestPackage.value.subjects.push(value);
};

onMounted(async () => {
  //   fetch service if subject store is empty
  if (!subjectStore.subjects.length) await fetchSubjects();
  await fetchModeltests();
  await setIntitialValue();
});

watch(
  () => modeltestPackage.value.subjects,
  async (newSubjects, oldSubjects) => {
    if (!modeltestPackage.value.subjects.length) {
      filteredModeltest.value = [];
      return;
    }
    const isSubjectRemoved = newSubjects.length < oldSubjects.length;

    if (isSubjectRemoved) {
      generalModelTestValueChange(modeltestPackage.value.general_model_tests);
    }

    store.loading = true;

    const subjectsFilter =
      "pagination=false&unique=" +
      (!props.initialValue ? 1 : 0) +
      (modeltestPackage.value.subjects.length
        ? `&subjects=${modeltestPackage.value.subjects?.toString()}`
        : "");

    const response = await ModelTestService.fetch(subjectsFilter);
    store.loading = false;

    if (!response.success) {
      toast.add({
        severity: "error",
        summary: "Error!",
        detail: response.message,
        life: 3000,
      });

      return;
    }
    filteredModeltest.value = response.data;
  }
);
</script>

<style scoped lang="scss">
.card-container {
  width: 100%;
  background: #ffffff;
  border-radius: 12px;
  min-height: 75vh;
}

.form-title {
  width: 299px;
  height: 48px;
  font-family: "Poppins", serif;
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 48px;
  display: flex;
  align-items: center;
  color: #3e3e3e;
}

.form-body {
  width: 100%;
  height: 100%;
}
::v-deep(.tab-view.p-tabview) {
  .p-tabview-panels {
    padding: 0;
    margin-top: 1rem;
  }
}

@media only screen and (max-width: 600px) {
  .form-title {
    font-weight: 500;
    font-size: 18px;
  }
}
</style>
