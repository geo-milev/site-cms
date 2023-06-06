import withAlign from "../common/plugin";
import Button from "./Button";
import JustifyAlignElement from "./Element";

export default {
    name: 'justify',
    Button: Button,
    Element: JustifyAlignElement,
    plugins: [withAlign]
}
