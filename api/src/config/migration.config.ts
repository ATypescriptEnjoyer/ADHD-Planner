import { DataSource } from "typeorm";
import { getConfig } from "./datasource.config";

const datasource = new DataSource(getConfig());
export default datasource;