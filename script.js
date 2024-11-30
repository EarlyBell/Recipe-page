let recipes;
let value;
fetch("https://dummyjson.com/recipes")
  .then(async (res) => await res.json())
  .then((data) => {
    recipes = data.recipes;
    display();
  })
  .catch((err) => console.log(err));
const container =
  document.querySelector(".container");

const themeToggle = document.querySelector(
  "#themeToggle"
);
const search = document.querySelector("#search");

search.addEventListener("input", () => {
  value = search.value.toLowerCase();
  searchRecipe();
});

function searchRecipe() {
  let searchedRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(value)
  );
  display(searchedRecipes)
}

function display(searchedRecipes) {
  let searchRecipes = searchedRecipes || recipes;
  container.innerHTML = "";
  searchRecipes.map((recipe) => {
    const preview = document.createElement("div");
    preview.classList.add("preview");
    const package = document.createElement("div");
    package.classList.add("package");
    const image = document.createElement("img");
    const cuisine = document.createElement("h2");
    const cookTime = document.createElement("h3");
    const rating = document.createElement("h3");
    rating.textContent =
      "Rating : " + recipe.rating;
    const name = document.createElement("h1");
    name.textContent = recipe.name;

    cookTime.textContent =
      "Cook Time : " + recipe.cookTimeMinutes;
    cuisine.textContent =
      "Cuisine : " + recipe.cuisine;
    image.src = recipe.image;
    image.alt = recipe.title;

    // themeToggle.addEventListener(
    //   "click",
    //   () => {
    //     document.body.classList.toggle("dark");
    //     if (
    //       document.body.classList.contains(
    //         "dark"
    //       )
    //     ) {
    //       preview.classList.add("package-dark");
    //     } else {
    //       preview.classList.remove(
    //         "package-dark"
    //       );
    //     }
    //   }
    // );

    package.addEventListener("click", () => {
      const modal = document.createElement("div");
      modal.classList.add("modal");
      const modalBtn =
        document.createElement("button");
      modalBtn.classList.add = "modalBtn";
      modalBtn.textContent = "Close";
      modalBtn.addEventListener("click", () => {
        modal.remove();
      });
      const modalImg = image.cloneNode(true);
      const modalName = name.cloneNode(true);
      const modalCuisine =
        cuisine.cloneNode(true);
      const modalCookTime =
        cookTime.cloneNode(true);
      const modalRating = rating.cloneNode(true);
      const instructions = recipe.instructions;
      const instructionList =
        document.createElement("ul");
      instructions.map((instruction) => {
        const instructionItem =
          document.createElement("li");
        instructionItem.textContent = instruction;
        instructionList.append(instructionItem);
      });
      const ingredients = recipe.ingredients;
      const ingredientList =
        document.createElement("ul");
      ingredients.map((ingredient) => {
        const ingredientItem =
          document.createElement("li");
        ingredientItem.textContent = ingredient;
        ingredientList.append(ingredientItem);
      });
      modal.append(modalBtn);
      modal.append(modalImg);
      modal.append(modalName);
      modal.append(modalCuisine);
      modal.append(modalCookTime);
      modal.append(modalRating);
      modal.append(ingredientList);
      modal.append("Instructions : ");
      modal.append(instructionList);
      container.append(modal);
    });
    container.append(package);
    preview.append(name);
    preview.append(cuisine);
    preview.append(cookTime);
    preview.append(rating);
    package.append(image);
    package.append(preview);
  });
}
