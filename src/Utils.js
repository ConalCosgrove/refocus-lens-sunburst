
module.exports = {

  /* Suggested data structure:
  *
  * Subjects
  * Samples
  * Aspects
  */

  processNode: function processNode(node) {
    const data = {samples: new Map(), aspects: new Map(), subjects: new Map()}
    data.subjects.set(node.absolutePath, node);
    if (node.samples) {
      node.samples.forEach((sample) => {
        sample.subjectId = node.id;
        sample.subjectAbsolutePath = node.absolutePath;
        data.samples.set(sample.name, sample);
        data.aspects.set(sample.aspect.name, sample.aspect);
      });
    }

    if (node.children) {
      node.children.forEach( (n) => {
        const retval = processNode(n);
        retval.samples.forEach((sample) => {
          data.samples.set(sample.name, sample);
          data.aspects.set(sample.aspect.name, sample.aspect); });
        retval.subjects.forEach((subject) => {
          data.subjects.set(subject.absolutePath, subject); });
      });
    }
    return data;
  },

  sortMap: function (map) {
    const sorted = new Map();
    const sortedKeys = Array.from(map.keys()).sort();
    sortedKeys.forEach((key) => sorted.set(key, map.get(key)));
    return sorted;
  },

};
