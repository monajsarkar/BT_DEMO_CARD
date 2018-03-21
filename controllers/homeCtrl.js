var homeCtrl = angular.module('homeCtrl', []);
homeCtrl.controller('homeCtrl', ['$scope', '$http', '$resource', '$location', '$timeout', 'Deck',
                           function($scope, $http, $resource, $location, $timeout, Deck) {
	
	var timeoutHandle = null;
	
    function nextTick(){
        $scope.timer++;
        timeoutHandle = $timeout(nextTick,1000);
    }
    
    function startTimer() {
        timeoutHandle = $timeout(nextTick, 1000);
    }
    
    function stopTimer() {
        if (timeoutHandle) {
            $timeout.cancel(timeoutHandle);
            timeoutHandle = null;
        }
    }
    
    $scope.init = function() {
        $scope.deck = new Deck(9);
        stopTimer();
        $scope.moves = 0
        $scope.timer = 0;
        $scope.done = false;
    };
    
    $scope.toggle = function(card) {
        // double click, do nothing
        if ($scope.selectedCard === card) { return; }        
        $scope.moves++;
        if ($scope.moves === 1) { // start timer on 1st move
            startTimer();
        }
        if ($scope.selectedCard) {
            if ($scope.selectedCard.number === card.number) {
               $scope.selectedCard.clear();
               card.clear();
               if ($scope.deck.allCleared()) {
                   $scope.done = true;
                   stopTimer();
               }
            } else {
               card.show();
            }
            $scope.selectedCard = null;
        } else {
            card.show();
            $scope.deck.hideAllBut(card);
            $scope.selectedCard = card;   
        }
    };
    $scope.init();
	
}]).factory('Card', function() {
    function Card (number) {
        this.visible = false;
        this.cleared = false;
        this.number = number;
    };
    Card.prototype.show = function() {
        this.visible = true;   
    };
    Card.prototype.hide = function() {
        this.visible = false;   
    };
    Card.prototype.clear = function() {
        this.cleared = true;   
    };
    return Card;
}).factory('Deck', function(Card) {
    function shuffle(array) {
        var counter = array.length, temp, index;
        while (counter--) {
            index = (Math.random() * counter) | 0;
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }
    
    function Deck (numberOfCards) {
        var array = [];
        for (var i = 1; i <= numberOfCards; i++) {
            array.push(new Card(i));  
            array.push(new Card(i));
        }
        this.cards = shuffle(array);
    };
    
    Deck.prototype.hideAllBut = function(card) {
        for (var i = 0; i < this.cards.length; i++) {
            if (this.cards[i] !== card) {
                this.cards[i].hide(); 
            }
        }
    };
    
    Deck.prototype.allCleared = function() {
        for (var i = 0; i < this.cards.length; i++) {
            if (!this.cards[i].cleared) {
                return false;
            }
        }
        return true;
    };
    
    return Deck;
});		
		