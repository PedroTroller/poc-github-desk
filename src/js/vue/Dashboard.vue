<template>
    <div class="dashboard">
        <div class="organisations">
            <div v-for="organisation in organisations" v-on:click="currentOrganisation = organisation.id">
                <organisation :organisation="organisation">
                </organisation>
            </div>
        </div>
        <div class="content" v-for="organisation in organisations" :style="{
            display: currentOrganisation == organisation.id ? '' : 'none'
        }">
            <panels :organisation="organisation" :notifications="organisation.notifications">
            </panels>
        </div>
    </div>
</template>

<script>
    import notifications from '../notifications'
    import OAuth from '../oauth.js';
    import Panels from './Dashboard/Panels';
    import Organisation from './Dashboard/Organisation';
    import Rx from 'rxjs/Rx';

    export default {
        name: 'dashboard',

        components: {
            Panels,
            Organisation,
        },

        data: function () {
            return {
                organisations: [],
                currentOrganisation: null,
            };
        },

        compiled: {
        },

        mounted: function () {
            OAuth.onToken(() => {
                let stream = notifications
                    .buildStream()
                ;

                stream
                    .subscribe((notification) => {
                        let organisation = notification.repository.owner;

                        if (this.currentOrganisation === null ){
                            this.currentOrganisation = organisation.id;
                        }

                        if (0 !== this.organisations.filter((current) => organisation.id === current.id).length) {
                            return;
                        }

                        let single = Rx.Observable.defer(() => notification);

                        organisation.notifications = stream
                            .filter((notification) => notification.repository.owner.id === organisation.id)
                            .concat(single)
                        ;

                        this.organisations.push(organisation);
                    })
                ;
            });
        },
    }
</script>

<style lang="less" scoped>

    .dashboard {
        background-color: #2A2A2A;
        width: 100%;
        height: 100%;
        display: flex;

        .organisations {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        .content {
            flex: 5
        }
    }

</style>
