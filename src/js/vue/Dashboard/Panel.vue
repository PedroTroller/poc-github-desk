<template>
    <div class="panel">
        <div class="header">
            <h3 class="panel-title">{{ type.name }}</h3>
        </div>
        <div class="body">
            <notification v-for="item in items" :key="item.id" :notification="item">
            </notification>
        </div>
    </div>
</template>

<script>
    import Notification from './Notification';

    export default {
        name: 'panel',

        components: {
            Notification,
        },

        props: {
            type: { required: true },
            notifications: { required: true },
        },

        data: function () {
            return {
                items: [],
            };
        },

        compiled: {
        },

        mounted: function () {
            this.notifications.subscribe((notification) => {
                this.items.push(notification);
            });
        },
    }
</script>

<style lang="less" scoped>
    .panel {
        margin: 5px;
        display: flex;
        flex-direction: column;

        .header {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .body {
            flex: 15;
            overflow-y: scroll;
        }
    }
</style>
