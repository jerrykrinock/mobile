import { call, put, takeLatest } from 'redux-saga/effects'
import Api from '../modules/api'
import {
	COVERS_LOAD_REQ, COVERS_LOAD_SUCCESS, COVERS_LOAD_ERROR
} from '../constants/covers'

//Requests
export default function* () {
	yield takeLatest([
		COVERS_LOAD_REQ
	], load)
}

function* load({ ignore=false, query='' }) {
	if (ignore)
		return;

	try {
		const { items, result=false } = yield call(Api.get, `collections/covers/${encodeURIComponent(query.trim())}`)

		if (!result)
			throw new Error('cant load icons')

		yield put({
			type: COVERS_LOAD_SUCCESS,
			items
		});
	} catch (error) {
		yield put({
			type: COVERS_LOAD_ERROR,
			error
		});
	}
}