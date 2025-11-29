import { defineStore } from "pinia";

export const usePostItStore = defineStore('postItStore', {
    state: () => ({
        postIt: JSON.parse(localStorage.getItem('postIt')) || [],
    }),

    actions: {
        addPostIt(post) {
            this.postIt.push(post)

            localStorage.setItem('postIt', JSON.stringify(this.postIt))
        },

        deletePostit() {
            localStorage.removeItem('postIt')
            this.postIt = []
        },

        getPostIt() {
            this.postIt = JSON.parse(localStorage.getItem('postIt'))
        },

        getPostItById(id) {
            // console.log(typeof(id))
            // // console.log("sdfghj")
            // this.postIt.forEach(element => {
            //     if (element.id === parseInt(id)) {
            //         console.log("sdfghj")

            //         console.log(element.id)
            //         return
            //     }
            //     console.log(typeof(element.id))
            // });
            const currentPostIt = this.postIt.find(myP => myP.id === parseInt(id));
            // console.log(currentPostIt)
            return currentPostIt
        },

        updatePostIt(updatedPost) {
            const index = this.postIt.findIndex(p => p.id === parseInt(updatedPost.id))
            if (index !== -1) {
                this.postIt[index] = {
                    ...this.postIt[index],
                    title: updatedPost.title,
                    description: updatedPost.description,
                    update: updatedPost.update
                }
                localStorage.setItem('postIt', JSON.stringify(this.postIt))
            }
        },

        deletePostItById(id) {
            const index = this.postIt.findIndex(p => p.id === parseInt(id))
            if (index !== -1) {
                this.postIt.splice(index, 1)
                localStorage.setItem('postIt', JSON.stringify(this.postIt))
            }
        }



    }
})