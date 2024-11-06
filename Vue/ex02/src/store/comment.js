import { defineStore } from 'pinia';

export const useCommentStore = defineStore('comment', {
  state: () => ({
    comments: [], // 댓글 목록
  }),
  actions: {
    loadComments(commentData) {
      this.comments = commentData.result; // API 응답으로부터 댓글 목록 저장
    },
    
    // 댓글 추가
    // addComment(nickname, profileImage, content) {
    //   const newComment = {
    //     id: //서버에서 ID를 받아야 함
    //     nickname,
    //     profileImage,
    //     content,
    //     createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '), // 현재 시간
    //   };
    //   this.comments.unshift(newComment); // 새로운 댓글을 목록의 앞에 추가
    // },
    // 댓글 삭제
    // deleteComment(commentId) {
    //   this.comments = this.comments.filter(comment => comment.id !== commentId); // 특정 ID의 댓글 삭제
    // }
  }
});
