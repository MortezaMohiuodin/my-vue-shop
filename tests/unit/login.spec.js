import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import LoginForm from "@/components/Forms/LoginForm.vue";

const $t = jest.fn();
const minLength = jest.fn();
const maxLength = jest.fn();
const required = jest.fn();

describe("LoginForm.vue", () => {
  const localVue = createLocalVue();
  localVue.use(Vuetify);
  it("disable submit button when username input was empty", () => {
    // arrange
    const wrapper = shallowMount(LoginForm, {
      localVue,
      mocks: { $t, required, minLength, maxLength },
    });
    // act
    wrapper.get('[data-test="username"]').setValue("");
    // assertion
    expect(wrapper.get('[data-test="submitBtn"]').attributes("disabled")).toBe(
      "disabled"
    );
  });
});
