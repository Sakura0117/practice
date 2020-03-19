var size = 0;
var slideNum = 0;
var xwidth = $('div#slider').width();
var timerID;
$('.flex-control-nav.flex-control-paging li').on('click', function(){
	var index = $('.flex-control-nav.flex-control-paging li').index(this);
	$('.flex-control-nav.flex-control-paging').find('li a').removeClass('flex-active');
	$(this).find('a').addClass('flex-active');
 
	var slideX = xwidth * index;
	var traStr = 'translate3d(-'+slideX+'px,0,0)'
 
	$('.slider-image').css({
		'-webkit-transform':traStr,
	});
 
});
$(function(){
	size = $('.flex-control-nav.flex-control-paging li').length;
	    setTimeout('slide()'); //アニメーションを実行
	});
 
function slide() {
    if(slideNum == size){slideNum=0;}
	var slideX = xwidth * slideNum;
	var traStr = 'translate3d(-'+slideX+'px,0,0)'
	$('.flex-control-nav.flex-control-paging').find('li a').removeClass('flex-active');
	$('.flex-control-nav.flex-control-paging li a').eq(slideNum).addClass('flex-active');
 
	$('.slider-image').css({
		'-webkit-transform':traStr,
	});
	slideNum++;
    timerID = setTimeout('slide()', 6000); //アニメーションを繰り返す間隔
}
 
$('#next').on('click',function(){
window.clearTimeout(timerID);
 slide();
});
$('#prev').on('click',function(){
window.clearTimeout(timerID);
if(slideNum > 1){
slideNum = slideNum - 2;
}else{
slideNum = size - 1;
}
 slide();
});

$(function() {
	const ALL_FILTER_KEY = "ALL";
	const ACTIVE_FILTER_KEY = "ACTIVE";
	const COMPLETED_FILTER_KEY = "COMPLETED";
  
	let $todos = null;
	let $checkAllButton = null;
	let $clearContainer = null;
	let $todoFilter = null;
  
	let currentFilter = "ALL";
	let todoItems = [{ name: "トップス", done: false }];
  
	const init = () => {
	  loadInitialTodos();
	};
  
	const updateItemsLeft = () => {
	  const length = todoItems.filter(todo => !todo.done).length;
	  $("#left-items").text(`${length} items left`);
	};
  
	const printCheckAll = () => {
	  const checkAny = todoItems.filter(todo => todo.done).length != 0;
	  const checkIcon = checkAny ? '<i class="fas fa-check"></i>' : "";
	  const checkAllButtonElem = `
		<button name="checkAllAction" class="w-1">
		  ${checkIcon}
		</button>
	  `;
  
	  $checkAllButton.empty();
	  $checkAllButton.append(checkAllButtonElem);
	};
  
	const printClearCompleted = () => {
	  const checkAny = todoItems.filter(todo => todo.done).length != 0;
	  const clearCompletedElem = checkAny
		? `
		<button name="clearCompoletedAction" class="text-md text-teal-500 font-light">Clear completed</div>
	  `
		: "";
  
	  $clearContainer.empty();
	  $clearContainer.append(clearCompletedElem);
	};
  
	const clearCompletedAction = () => {
	  todoItems = todoItems.filter(todo => {
		return !todo.done;
	  });
	};
  
	const checkAll = () => {
	  const checkAny = todoItems.filter(todo => todo.done).length != 0;
  
	  todoItems = todoItems.map(todo => {
		return {
		  ...todo,
		  done: !checkAny
		};
	  });
	};
  
	const addTodo = todo => {
	  todoItems = [...todoItems, todo];
	};
  
	const removeTodo = id => {
	  todoItems = todoItems.filter(todo => todo.id !== id);
	};
  
	const printTodo = todo => {
	  const checkIcon = todo.done ? '<i class="fas fa-check"></i>' : "";
	  const lineThrough = todo.done ? "line-through" : "";
	  const fontFolor = todo.done ? "text-teal-300" : "text-teal-500";
  
	  elem = `
		<div name="itemRow" class="relative flex flex-row w-full md:w-3/4 mx-auto bg-teal-200 border-b-2 border-teal-300 shadow-lg">
		  <div class="w-20 px-4 py-4 bg-teal-200">
			<button name="checkButton" data-id="${todo.id}" class="w-10 h-10 bg-teal-300 rounded-full shadow-inner flex justify-center items-center text-xl">
			  ${checkIcon}
			</button>
		  </div>
		  <div name="editableItem" data-id="${todo.id}" class="w-full px-4 py-4 text-2xl ${fontFolor} hover:underline font-light ${lineThrough}">${todo.name}</div>
		  <button name="removeItem" data-id="${todo.id}" class="absolute top-0 right-0 pt-1 pr-2 text-teal-400 shadow-inner">
			<i class="fas fa-times-circle"></i>
		  </button>
		</div>
	  `;
  
	  $todos.append(elem);
	};
  
	const printTodoFilter = () => {
	  const isAllFilter = currentFilter == ALL_FILTER_KEY;
	  const isActiveFilter = currentFilter == ACTIVE_FILTER_KEY;
	  const isCompletedFilter = currentFilter == COMPLETED_FILTER_KEY;
	  const borderAllFilter = isAllFilter ? "border-2 border-teal-300" : "";
	  const borderActiveFilter = isActiveFilter ? "border-2 border-teal-300" : "";
	  const borderCompletedFilter = isCompletedFilter
		? "border-2 border-teal-300"
		: "";
  
	  const elem = `
		<button name="filterAction" data-type="ALL" class="text-sm text-teal-500 font-light uppercase ${borderAllFilter} px-1 mr-2 rounded">All</button>
		<button name="filterAction" data-type="ACTIVE" class="text-sm text-teal-500 font-light uppercase ${borderActiveFilter} px-1 mr-2 rounded">Active</button>
		<button name="filterAction" data-type="COMPLETED" class="text-sm text-teal-500 font-light uppercase ${borderCompletedFilter} px-1 rounded">Completed</button>
	  `;
  
	  $todoFilter.empty();
	  $todoFilter.append(elem);
	};
  
	const switchFilter = filterType => {
	  currentFilter = filterType;
	  printTodoFilter();
	};
  
	const toggleDoneTodo = id => {
	  todoItems = todoItems.map(todo => {
		if (todo.id == id)
		  return { id: todo.id, name: todo.name, done: !todo.done };
		else return todo;
	  });
	};
  
	const renumberTodos = () => {
	  todoItems = todoItems.map((todo, i) => {
		return Object.assign(
		  {},
		  {
			...todo,
			id: i + 1
		  }
		);
	  });
	};
  
	const applyTodoFilter = todo => {
	  switch (currentFilter) {
		case ALL_FILTER_KEY:
		  return true;
		case ACTIVE_FILTER_KEY:
		  if (!todo.done) return true;
		  else return false;
		case COMPLETED_FILTER_KEY:
		  if (todo.done) return true;
		  else return false;
	  }
	};
  
	const loadInitialTodos = () => {
	  $todos = $("#todos-container");
	  $checkAllButton = $("#checkAll");
	  $clearContainer = $("#clear-container");
	  $todoFilter = $("#todo-filter");
  
	  $todos.empty();
	  renumberTodos();
  
	  todoItems.filter(applyTodoFilter).forEach(todo => {
		printTodo(todo);
	  });
  
	  updateItemsLeft();
	  printCheckAll();
	  printClearCompleted();
	  printTodoFilter();
	};
  
	init();
  
	$(document).on("keypress", "#inputTodo", function() {
	  const ENTER_KEY_NO = 13;
	  const keycode = event.keyCode ? event.keyCode : event.which;
	  const inputTodo = $(this).val();
  
	  if (keycode === ENTER_KEY_NO) {
		addTodo({ name: inputTodo, done: false });
		$(this).val("");
		loadInitialTodos();
	  }
	});
  
	$(document).on("click", 'button[name="removeItem"]', function() {
	  console.log("hello");
	  const removedTodoId = $(this).data("id");
	  removeTodo(removedTodoId);
	  loadInitialTodos();
	});
  
	$(document).on("click", 'button[name="checkButton"]', function() {
	  const clickedTodoId = $(this).data("id");
	  toggleDoneTodo(clickedTodoId);
	  loadInitialTodos();
	});
  
	$(document).on("click", 'button[name="checkAllAction"]', function() {
	  checkAll();
	  loadInitialTodos();
	});
  
	$(document).on("click", 'button[name="clearCompoletedAction"]', function() {
	  clearCompletedAction();
	  loadInitialTodos();
	});
  
	$(document).on("click", 'button[name="filterAction"]', function() {
	  const seletedFilterType = $(this).data("type");
	  switchFilter(seletedFilterType);
	  loadInitialTodos();
	});

  $(document).ready(function() {
	$('#box_btn').on('click', function(){
		$('#box').slideToggle();
  });
});
  