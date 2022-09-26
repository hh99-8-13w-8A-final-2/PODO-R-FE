import axiosApi, { baseApi } from "./api";

const apis = {  
    //로그인
    getKakao : (code) => axiosApi.get(`/api/oauth/kakao?code=${code}`),
    getTwitter : (oauth_token , oauth_verifier) => axiosApi.get(`/api/oauth/twitter?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`),
    postLogout : (headers) => axiosApi.post(`/api/member/logout`,{headers:headers}),
    getTwitterLogin : () => baseApi.get(`/api/twitter/login`),
    //메인 
    getLiveReviews : () => baseApi.get(`/api/reviews/live`),
    getFetchNotice : (pageNumber) => baseApi.get(`/api/notices?size=4&page=${pageNumber}`),
    getPopularMusical : () => baseApi.get(`/api/musicals/popular`),
    //마이페이지
    getMyReviewFind : (headers) => axiosApi.get(`/api/mypage/reviews`,{headers: headers}),
    getMyMusicalFindList : (headers) => axiosApi.get(`/api/mypage/musicals`,{headers: headers}),
    getMyDetailReview : (getMusicalId, headers) => axiosApi.get(`/api/mypage/${getMusicalId}/reviews`, {headers: headers}),
    //리뷰 작성
    getTheater: (theaterId) => baseApi.get(`/api/theaters/${theaterId}`),
    postImg : (imgFormdata, multipartHeader) => axiosApi.post(`/api/image/upload`, imgFormdata, multipartHeader) ,
    postReview : (musicalId, json, headers) => axiosApi.post(`/api/musicals/${musicalId}/reviews`, json , headers),
    getOpenMusical : () => baseApi.get(`/api/musicals/open`),
    //리뷰 페이지 
    getSeat:(theaterId) => baseApi.get(`/api/theaters/${theaterId}/seats`),
    getMusicalId : (musicalId) => baseApi.get(`/api/musicals/${musicalId}`),
    getTheaterInfo : (theaterId) => baseApi.get(`/api/theaters/${theaterId}`),
    getSeatMusical : (musicalId) => baseApi.get(`/${musicalId}/seats`),
    getReview : (musicalId, pageParam, headers, tagUrl) => axiosApi.get(`/api/musicals/${musicalId}/reviews?size=15&page=${pageParam}${tagUrl}`, {headers: headers}),
    getMusicalData : (musical) => axiosApi.get(`/api/musicals/${musical}`),
    getTags : (musicalId, pageParam, headers) => axiosApi.get(`/api/musicals/${musicalId}/reviews?size=15&page=${pageParam}`,{headers: headers}),
    getFetchTags : () => baseApi.get(`/api/tags`),
    //리뷰 디테일
    getReviewDetail :(musicalId, reviewsId) => axiosApi.get(`/api/musicals/${musicalId}/reviews/${reviewsId}`) ,
    deleteReview: (musicalId, reviewsId, headers) => axiosApi.delete(`/api/musicals/${musicalId}/reviews/${reviewsId}`, {headers: headers}),
    postLike : (reviewsId, headers) => axiosApi.post(`/api/hearts?reviewId=${reviewsId}`,{},{headers : headers}),
    deleteLike : (reviewsId, headers) => axiosApi.delete(`/api/hearts?reviewId=${reviewsId}`, {headers : headers}),
    //리뷰 수정
    postModifyImg : (formData ,multipartType) => axiosApi.post(`/api/image/upload`,formData, {headers: multipartType}),
    putModify : (musicalId, data, json, jsonType) => axiosApi.put(`/api/musicals/${musicalId}/reviews/${data.data.reviewId}`, json,{ headers: jsonType}),
    postComment : (reviewId, content, headers) => axiosApi.post(`/api/comments?reviewId=${reviewId}`,content, { headers: headers }),
    getComment : (reviewId, pageParam) => baseApi.get(`/api/comments?reviewId=${reviewId}&page=${pageParam}`),
    putModifyedComment : (modifyId, content, headers) => axiosApi.put(`/api/comments/${modifyId}`, content, {headers: headers}),
    deleteComment : (commentId, headers) => axiosApi.delete(`/api/comments/${commentId}`,{headers: headers}),
    

}

export default apis