import React from "react";
import { storiesOf } from "@storybook/react";
import { header } from "../components/header";

storiesOf("Header", module).add("index", () => header([1, 2, 3], [1, 2, 3]));
