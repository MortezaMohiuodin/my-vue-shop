import { shallowMount } from "@vue/test-utils";

import LoginForm from "@/components/Forms/LoginForm.vue";

describe("LoginForm.vue", () => {
  it("disable submit button when username input was empty", () => {
    // arrange
    const wrapper = shallowMount(LoginForm);
    // act
    wrapper.get('[data-test="username"]').setValue("");
    // assertion
    expect(wrapper.get('[data-test="submitBtn"]')).toBeDisabled();
  });
});
