<template>
    <div class="panels">
        <panel v-for="type in types" :key="type.name" :type="type" :notifications="type.notifications">
        </panel>
    </div>
</template>

<script>
    import notifications from '../../notifications'
    import Panel from './Panel';
    import Rx from 'rxjs/Rx';

    export default {
        name: 'panels',

        components: {
            Panel,
        },

        props: {
            organisation: { required: true },
            notifications: { required: true },
        },

        data: function () {
            return {
                types: [],
            };
        },

        compiled: {
        },

        mounted: function () {
            this.notifications
                .subscribe((notification) => {
                    let type = notification.subject.type;

                    if (0 !== this.types.filter((current) => type === current.name).length) {
                        return;
                    }

                    let single = Rx.Observable.defer(() => notification);
                    this.types.push({
                        name: notification.subject.type,
                        notifications: this
                            .organisation
                            .notifications
                            .filter((notification) => notification.subject.type === type)
                            .concat(single),
                    });
                })
            ;
        },
    }
</script>

<style lang="less" scoped>
    .panels {
        height: 100%;
        display: flex;
        flex-direction: row;

        .panel {
            flex: 1;
        }
    }
</style>
