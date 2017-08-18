import Vue from 'vue';

export const Bus = new Vue();
export const $emitNextTick = (event, ...args) => Bus.$nextTick(() => Bus.$emit(event, ...args));
export const $filteredOn = (event, filter, cb) => Bus.$on(event, (...args) => filter(...args) ? cb() : undefined);
