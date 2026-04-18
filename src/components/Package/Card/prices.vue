<template>
  <div class="w-26rem">
    <div class="price-header flex justify-content-between py-2">
      <div class="flex justify-content-center col-3">Price</div>
      <div class="flex justify-content-center col-4">Regular Price</div>
      <div class="flex justify-content-center col-3">Valid Till</div>
      <div class="flex justify-content-center col-2">Show</div>
    </div>

    <div
      v-for="(coursePrice, index) in prices"
      :key="index"
      class="price-list flex justify-content-between px-2"
    >
      <div class="package-price-validity flex col-3 justify-content-center">
        ৳ {{ coursePrice.price }}
      </div>
      <div class="package-price-validity flex col-4 justify-content-center">
        ৳ {{ coursePrice.regular_price }}
      </div>
      <div class="package-price-validity flex col-3 justify-content-center">
        {{ coursePrice.valid_till }}
      </div>
      <div class="package-price-validity flex col-2 justify-content-center">
        {{ coursePrice.show_regular_price ? "Yes" : "No" }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface price {
  price: number;
  regular_price: number;
  valid_till: string;
  show_regular_price: boolean;
}

const props = defineProps<{
  prices: price[];
}>();
</script>

<style lang="scss" scoped>
.price-header {
  background: #eeeeee;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.price-list {
  background-color: #f7f7f7;
}

.price-validity-slot:hover + .tooltip {
  opacity: 1;
}

.package-price-validity::after {
  content: " ";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #000000 transparent transparent transparent;
}
</style>
