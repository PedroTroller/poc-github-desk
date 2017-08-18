<template>
    <div class="notification">
        <div class="repository">
            <a :href="notification.repository.url">
                <i class="fa fa-github" aria-hidden="true"></i>
                {{ notification.repository.owner.login }} / {{ notification.repository.name }}
            </a>
        </div>
        <div class="content">
            {{ notification.subject.title }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'notification',

        props: {
            notification: { required: true },
        },

        data: function () {
            return {
            };
        },

        compiled: {
        },

        mounted: function () {
        },
    }
</script>

<style lang="less" scoped>
    .notification {
        height: 5em;
        cursor: pointer;
        margin-top: 5px;
        margin-left: 5px;
        margin-right: 5px;
        background-color: #393939;
        color: #CDCECF;
        padding: 5px;
        padding-left: 10px;
        display: flex;
        flex-direction: column;

        .repository {
            flex: 1;
            font-weight: bold;

            a {
                color: inherit;
            }
        }

        .content {
            flex: 1;
            padding-left: 1em;
        }
    }
</style>
