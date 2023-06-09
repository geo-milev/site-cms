import withAlign from "../common/plugin";
import Button from "./Button";
import CenterAlignElement from "./Element";

export default {
    name: 'center',
    Button: Button,
    Element: CenterAlignElement,
    plugins: [withAlign]
}
