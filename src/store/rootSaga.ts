import { all, fork } from "redux-saga/effects";

import { countriesSaga } from "@/features/countries/exports";

export function* rootSaga() {
  yield all([fork(countriesSaga)]);
}
