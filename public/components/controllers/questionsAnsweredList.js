(function() {
  angular
    .module('slackOverflowApp')
    .controller('questionsAnsweredListCtrl', ['QuestionsService', 'store', function(QuestionsService, store) {
      var vm = this;
      vm.questionsList = [];
      vm.userId = store.get('profile').userInfo.Id;
      vm.currentUsername = store.get('profile').userInfo.name;
      vm.fieldArray = store.get('profile').userInfo.fields;

      QuestionsService.getQuestionsForUser()
        .then((resp) => {
          answersObj = resp.data;
          console.log('resp.data', resp.data);
          console.log('clicked', answersObj);
        })
        .then(() => {
          var name = answersObj.results[0].name;
          for (var i = 0; i < answersObj.results[0].questions.length; i++) {
            var question = {};
            question.name = name;
            question.id = answersObj.results[0].questions[i].id;
            question.title = answersObj.results[0].questions[i].title;
            question.text = answersObj.results[0].questions[i].text;
            question.field = answersObj.results[0].questions[i].field.name;
            vm.questionsList.push(question);
          }
          // var sortedOutput = _.sortBy(output, 'id');
          console.log(vm.questionsList);
        })
        .catch((err) => {
          console.error('error fetching questions for user ', err);
        })

    }])
})();