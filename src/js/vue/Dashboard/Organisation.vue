<template>
    <div class="organisation">
        <img :src="organisation.avatar_url" />
        <span>{{ organisation.login }}</span>
    </div>
</template>

<script>
    export default {
        name: 'organisation',

        props: {
            organisation: { required: true },
        },
    }
</script>

<style lang="less" scoped>
    .organisation {
        height: 5em;
        cursor: pointer;
        margin-top: 5px;
        margin-left: 5px;
        margin-right: 5px;
        background-color: #393939;

        img {
            height: 100%;
        }

        span {
            margin-left: 1em;
            font-weight: bold;
            color: #CDCECF;
        }
    }
</style>
