$("body").on("click", ".heatUp", async (event) => {
    const reviewId = event.target.value
    console.log("heatUp", reviewId);

    await axios.post("/api/review/vote", {
                reviewId,
                vote: true,
            })
})

$("body").on("click", ".coolDown", async (event) => {
    const reviewId = event.target.value
    console.log("coolDown", reviewId);
//     

// })
await axios.post("/api/review/vote", {
    reviewId,
    vote: false,
})
})
