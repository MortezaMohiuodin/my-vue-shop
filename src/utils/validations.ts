import { LocaleMessage } from "vue-i18n";
import i18n from "@/plugins/i18n";
export const required = (v: string, label: LocaleMessage | string) => {
  return !!v || i18n.t("validation.required", { label });
};

export const maxLength = (
  v: string,
  max: number,
  label: LocaleMessage | string
) => v.length <= max || i18n.t("validation.maxLength", { label, max });

export const minLength = (
  v: string,
  min: number,
  label: LocaleMessage | string
) => v.length >= min || i18n.t("validation.minLength", { label, min });
