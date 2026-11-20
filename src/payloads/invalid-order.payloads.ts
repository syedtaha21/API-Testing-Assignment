export const InvalidOrderPayloads={
    missingBookId: ()=>({
        cutomerName: 'Taha'
    }),
    missingCustomerName:()=>({
        bookId: 1
    }),
    invalidBookId:()=>({
        bookId: 99999,
         cutomerName: 'Taha'
    })
}