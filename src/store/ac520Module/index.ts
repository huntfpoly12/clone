// create ac520Module tyepscript
import { Module } from 'vuex'
import {AC520State} from "@/store/ac520Module/types";
import {ComponentCreateBudget} from "@/views/AC/AC5/AC520/type";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const ac520Module : Module<AC520State, any> = {
  namespaced: true,
  state: () => ({
    dataBudget: null,
    typeCreateBudget: ComponentCreateBudget.EmployeeSalaryTable
  }),
  getters,
  mutations,
  actions
}
export default ac520Module
