<template>
    <div id="authenticator" :class="{
       authenticated: null != token,
    }">
    </div>
</template>

<script>
    import OAuth from '../oauth.js';
    import dispatcher from '../dispatcher.js';
    import QueryString from 'query-string';
    import stream from '../stream'

    export default {
        name: 'authenticator',

        data: function () {
            return {
                token: null,
            };
        },

        computed: {
        },

        mounted: function () {
            OAuth.onToken((token) => this.token = token);

            OAuth.connect();
        },
    }
</script>

<style lang="less" scoped>
#authenticator {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    background: #24292e;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.5s, visibility 0.5s;

    &.authenticated {
        opacity: 0;
        visibility: hidden;
    }
}
</style>
