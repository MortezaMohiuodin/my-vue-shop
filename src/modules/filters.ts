export default {
  price(val: number | string) {
    const reverse = (val: number | string) =>
      (val || 0).toString().split("").reverse().join("");

    return reverse(reverse(val).replace(/(\d{3})(?=\d)/g, "$1,"));
  },
};
