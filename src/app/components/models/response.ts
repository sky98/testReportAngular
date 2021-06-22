import { Activity } from "./activity";
import { Link } from "./link";
import { Meta } from "./meta";

export interface Response{
    data: Activity;
    links: Link;
    meta: Meta;
}