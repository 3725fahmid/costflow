<template>
  <div class="package-card grid p-3">
    <div class="col-12 grid m-0 p-0">
      <div class="col-12 md:col-3 p-0">
        <img
          :src="packageData.cover ?? '/images/no-image.jpg'"
          :alt="packageData.name"
          class="w-full max-h-14rem border-round-md"
        />
      </div>
      <div class="col-12 md:col-9">
        <div
          v-if="!details"
          class="card-header grid justify-content-between align-items-center"
        >
          <div class="card-sub-header col-10 md:col-10">
            <CommonCardBreadcrumb
              :start="true"
              :bread-crumb-item="breadCrumbItem"
            />
          </div>
          <div class="col-2 flex justify-content-end align-items-center">
            <CommonActionButtons
              :show-view-button="true"
              :show-edit-button="true"
              @view-data="viewDetails(packageData.type, packageData?.id)"
              @edit-data="editDetails(packageData.type, packageData?.id)"
            />
          </div>
        </div>

        <div class="grid">
          <div class="col-12 md:col-8">
            <div class="w-full">
              <p class="field-name">Package Name</p>
              <div class="title">
                {{ packageData?.name }}
              </div>
            </div>
            <div class="flex flex-wrap align-items-center gap-3 mt-3">
              <CommonMetaData :data-key="'Total Sales'" :value="100" />

              <CommonMetaData :data-key="'Total Income'" :value="'৳' + 20000" />

              <CommonTooltip>
                <template #element>
                  <div class="flex align-items-center">
                    <div class="meta-title mr-1">Prices and Validates</div>
                    <img
                      src="/images/icons/rectangleIcon.svg"
                      class="rectangle-image"
                      alt=""
                    />
                  </div>
                </template>

                <template #content>
                  <PackageCardPrices :prices="prices" />
                </template>
              </CommonTooltip>
            </div>
          </div>
          <div v-if="packageData.subjects.length > 0" class="col-12 md:col-4">
            <div>
              <CommonTagList
                :title="'Subjects'"
                :values="packageData?.subjects"
                :background-white="true"
                :collapse-list="details"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="details">
      <div class="m-4">
        <p class="field-name">Summary</p>
        <CommonShowMarkdown :text="packageData?.summary" />
      </div>
      <div class="m-4">
        <p class="field-name">Details</p>
        <CommonShowMarkdown :text="packageData?.details" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOCAL_PACKAGE_ROUTE } from "~~/constants/local-route";
import { Package } from "~~/contracts/api-constracts/package-contracts";
const router = useRouter();

const props = defineProps<{
  packageData: Package;
  index: number;
  isFirst?: boolean;
  isLast?: boolean;
  details?: boolean;
}>();

const breadCrumbItem = {
  label: props.packageData?.curriculum?.name,
  item: {
    label: props.packageData?.session?.name,
  },
};

const remainingDate = computed(() => {
  const currentDate = new Date();
  const endDate = new Date(props.packageData?.valid_till);
  const difference = endDate.getTime() - currentDate.getTime();

  const remainDate = Math.floor(difference / (1000 * 60 * 60 * 24));
  if (remainDate > 0) {
    return remainDate + " day";
  } else {
    return 0 + " day";
  }
});

const prices = ref([
  {
    price: props.packageData?.price,
    regular_price: props.packageData?.regular_price,
    valid_till: remainingDate,
  },
]);

prices.value = [...prices.value, ...props.packageData.multiPrices];

const viewDetails = (type: string, id: number) => {
  router.push(LOCAL_PACKAGE_ROUTE + `/${type}-wise/` + id);
};

const editDetails = (type: string, id: number) => {
  router.push(LOCAL_PACKAGE_ROUTE + `/${type}-wise/` + id + "/edit");
};
</script>

<style scoped>
.package-card {
  min-height: 225px;
  border-radius: 12px 12px;
  background: #ffffff;
}

.package-card-image {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  max-height: 342px;
}

.title {
  font-family: "Poppins", serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  word-wrap: break-word;

  color: #3e3e3e;
}

.meta-title {
  color: #616161;
  padding-bottom: 0;
  font-family: Poppins, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
}

.rectangle-image {
  width: 18px;
  height: 16px;
}

.field-name {
  margin: 0px;

  font-family: "Poppins", serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;

  display: flex;
  align-items: center;

  color: #b1b1b1;
}

@media only screen and (max-width: 768px) {
  .title {
    font-weight: 600;
    font-size: 16px;
  }
}

@media (min-width: 769px) and (max-width: 1200px) {
  .title {
    font-weight: 600;
    font-size: 18px;
  }
}
</style>
