import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";
import { FList, FItem } from "..";

const groupId = "FIELD-LIST-ID1";

storiesOf("Components|List", module).add(
  "List",
  () => ({
    components: { FList, FItem },
    props: {
      title: {
        default: text("title", "This is a title", groupId)
      },
      label: {
        default: text("label", "Text label", groupId)
      },
      to: {
        default: text("to", "#/home", groupId)
      },
      link: {
        default: text("link", "#/url", groupId)
      }
    },
    template: `
      <f-list>
        <f-item :title="title" :link="link">{{ label }}</f-item>
        <f-item :title="title" :label="label" :to="to" />
        <f-item :title="'Title #3'">Item #4</f-item>
      </f-list>
    `
  }),
  {
    info: {
      sumary: "List > Item component"
    }
  }
);