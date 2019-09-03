import React from "react"
import { storiesOf } from "@storybook/react"
import Footer from "./index"

storiesOf("Site footer", module)
    .add("default", () => (
        <Footer />
    ))