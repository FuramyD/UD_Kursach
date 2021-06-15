import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Reports from "../views/Reports";
import Tables from "../views/Tables";
import Forms from "../views/Forms";
import CreateUser from "../views/forms/CreateUser";
import SendConnection from "../views/forms/SendConnection";
import ConfirmConnection from "../views/forms/ConfirmConnection";
import Auth from "../views/forms/AuthUser";
import UsersTable from "../views/tables/UsersTable";
import UsersJoinConnectionsTable from "../views/tables/UsersJoinConnectionsTable";
import DeleteUser from "../views/forms/DeleteUser";
import DeleteConnection from "../views/forms/DeleteConnection";
import PublishPost from "../views/forms/PublishPost";
import PostsTable from "../views/tables/PostsTable";
import GroupsPostsTable from "../views/tables/GroupsPostsTable";
import UsersPostsTable from "../views/tables/UsersPostsTable";
import CreateGroup from "../views/forms/CreateGroup";
import PublishGroupPost from "../views/forms/PublishGroupPost";
import DeleteGroup from "../views/forms/DeleteGroup";
import GroupsTable from "../views/tables/GroupsTable";
import GroupSubscribe from "../views/forms/GroupSubscribe";
import SubscriptionsTable from "../views/tables/SubscriptionsTable";
import AllGroupsAndSubscribers from "../views/reports/AllGroupsAndSubscribers";
import AllUsersAndConnections from "../views/reports/AllUsersAndConnections";

const routes = [
  {
    path: '/',
    redirect: '/tables'
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports
  },
  {
    path: '/tables',
    name: 'Tables',
    component: Tables
  },
  {
    path: '/forms',
    name: 'Forms',
    component: Forms
  },
  {
    path: '/forms/users/registration',
    name: 'CreateUser',
    component: CreateUser
  },
  {
    path: '/forms/users/auth',
    name: 'AuthUser',
    component: Auth
  },
  {
    path: '/forms/users/delete',
    name: 'DeleteUser',
    component: DeleteUser
  },
  {
    path: '/forms/users/connections/send',
    name: 'SendConnection',
    component: SendConnection
  },
  {
    path: '/forms/users/connections/receive',
    name: 'confirmConnection',
    component: ConfirmConnection
  },
  {
    path: '/forms/users/connections/delete',
    name: 'deleteConnection',
    component: DeleteConnection
  },
  {
    path: '/forms/users/post',
    name: 'publishPost',
    component: PublishPost
  },
  {
    path: '/forms/groups/create',
    name: 'createGroup',
    component: CreateGroup
  },
  {
    path: '/forms/groups/post',
    name: 'publishGroupPost',
    component: PublishGroupPost
  },
  {
    path: '/forms/groups/delete',
    name: 'deleteGroup',
    component: DeleteGroup
  },
  {
    path: '/forms/users/subscribe',
    name: 'usersSubscribe',
    component: GroupSubscribe
  },
  {
    path: '/tables/users',
    name: 'UsersTable',
    component: UsersTable
  },
  {
    path: '/tables/groups',
    name: 'GroupsTable',
    component: GroupsTable
  },
  {
    path: '/tables/usersJoinConnections',
    name: 'UsersJoinConnections',
    component: UsersJoinConnectionsTable
  },
  {
    path: '/tables/posts',
    name: 'PostsTable',
    component: PostsTable
  },
  {
    path: '/tables/groups-posts',
    name: 'GroupsPostsTable',
    component: GroupsPostsTable
  },
  {
    path: '/tables/users-posts',
    name: 'UsersPostsTable',
    component: UsersPostsTable
  },
  {
    path: '/tables/subscriptions',
    name: 'subscriptionsTable',
    component: SubscriptionsTable
  },
  {
    path: '/reports/all-groups-and-subscribers',
    name: 'allGroupsAndSubscribers',
    component: AllGroupsAndSubscribers
  },
  {
    path: '/reports/all-users-and-connections',
    name: 'allUsersAndConnections',
    component: AllUsersAndConnections
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
