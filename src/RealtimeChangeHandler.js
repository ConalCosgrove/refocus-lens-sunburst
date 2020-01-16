/*
* ./src/RealtimeChangeHandler.js
*
* Handle each type of change by updating the data accordingly
*/

const utilities = require('./Utils.js')


function onSampleRemove(sample, data) {
	console.log(new Date(), 'onSampleRemove', sample);
	// TODO implement me!
	// For example, you may need to preprocess and remove this sample from some
	// data structure.
	let node = utilities.processNode(data);

}

function onSampleUpdate(change, data) {
  console.log(new Date(), 'onSampleUpdate', change);
  data.children[0].children[0].status === "1" ? data.children[0].children[0].status = "0" : data.children[0].children[0].status = "1"
	// TODO implement me!
	// You may need to preprocess and update this sample in some
	// data structure.
	let node = utilities.processNode(data);
}

function onSampleAdd(sample, data) {
    console.log(new Date(), 'onSampleAdd', sample);
    //TODO implement me!
    //For example, you may need to preprocess and add this new sample to some
    //data structure.
    let node = utilities.processNode(data);
}

function onSubjectAdd(subject, data) {
	console.log(new Date(), 'onSubjectAdd', subject);
	// TODO implement me!
	// For example, you may need to preprocess and add this new subject to some
	// data structure.
}

function onSubjectRemove(subject, data) {
	console.log(new Date(), 'onSubjectRemove', subject);
	// TODO implement me!
	// For example, you may need to preprocess and remove this subject from
	// some data structure.
}

function onSubjectUpdate(change, data) {
  console.log(new Date(), 'onSubjectUpdate', change);
  updateNodes(data, change.new.absolutePath, change.new.status);
	// TODO implement me!
	// For example, you may need to preprocess and update this subject in some
	// data structure.
}

function updateNodes(data, name, newStatus) {
  if (data.children) {
    data.children.forEach((child) => updateNodes(child, name, newStatus));
  }
  if (name === data.name + '|status') {
    update(parent, newStatus);
  }
}

function update(node, status) {
  node.status = status;
}

module.exports = {
  handle: function (chg, data) {
    if (chg['sample.add']) {
      onSampleAdd(chg['sample.add'], data)
    } else if (chg['sample.remove']) {
      onSampleRemove(chg['sample.remove'], data)
    } else if (chg['sample.update']) {
      onSampleUpdate(chg['sample.update'],data);
    } else if (chg['subject.add']) {
      onSubjectAdd(chg['subject.add'], data)
    } else if (chg['subject.remove']) {
      onSubjectRemove(chg['subject.remove'], data)
    } else if (chg['subject.update']) {
      onSubjectUpdate(chg['subject.update'], data)
    }
  },
};
