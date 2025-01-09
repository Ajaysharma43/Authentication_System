export const A_Z_Sort = (data) => {
    const sorting = data.sort((a, b) => a.Username.localeCompare(b.Username));
    console.log(sorting); 
    return sorting;
}

export const Date_Sort = (data) => {
    const date = data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    console.log(date);
    return date;
}