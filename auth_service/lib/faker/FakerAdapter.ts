import FakerDatatype from "./FakerDatatype";
import FakerInternet from "./FakerInternet";
import FakerName from "./FakerName";
import { faker } from "@faker-js/faker";

export default class FakerAdapter {
    datatype() {
        return new FakerDatatype(faker.datatype);
    }

    internet() {
        return new FakerInternet(faker.internet);
    }

    name() {
        return new FakerName(faker.name);
    }
}
