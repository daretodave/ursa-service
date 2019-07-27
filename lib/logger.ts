import {DEVELOPMENT} from "./config";

export function out(label: string, ...message) {
    console.log(label, ...message);
}

export function error(label: string, ...message) {
    console.error(label, ...message);
}