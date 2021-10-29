'use strict';

class Collections {
	constructor(model) {
		this.model = model;
	}

	async get(receiver) {
		try {
			let records = null;
			if (receiver) {
				records = this.model.findAll({ where: { receiver: this.receiver } });
			} else {
				records = this.model.findAll({});
			}
			return records;
		} catch (e) {
			return e;
		}
	}
	async create(json) {
		try {
			return await this.model.create(json);
		} catch (e) {
			return e;
		}
	}
	async update(id, json) {
		try {
			let record = await this.model.findOne({ where: { id: id } });
			let updatedRecord = await record.update(json);
			return updatedRecord;
		} catch (e) {
			return e;
		}
	}
	async delete(id) {
		try {
			await this.model.destroy({ where: { id } });
			let deleted = 'succefully deleted';
			return deleted;
		} catch (e) {
			return e;
		}
	}
}

module.exports = Collections;
