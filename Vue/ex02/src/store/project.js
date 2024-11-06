import { defineStore } from 'pinia';

export const useProjectStore = defineStore('project', {
  state: () => ({
    title: '',
    content: '',
    boardId: '',
    imageUrl: '',
    location: null, // 기본값을 null로 수정
    recruitmentStatus: '',
    viewCount: '',
    projectPeriod: '',
    startDate: '',
    endDate: '',
    nickname: '',
    username: '',
    profileImage: '',
    createdAt: '',
    lastModifiedAt: '',
    positionDtoList: [],
    techStackDtoList: []
  }),
  actions: {
    loadProject(data) {
      this.title = data.result.title;
      this.content = data.result.content;
      this.boardId = data.result.boardId;
      this.imageUrl = data.result.imageUrl;
      this.location = data.result.location; // location도 null 가능성을 고려
      this.recruitmentStatus = data.result.recruitmentStatus;
      this.viewCount = data.result.viewCount;
      this.projectPeriod = data.result.projectPeriod;
      this.startDate = data.result.startDate; // startDate 추가
      this.endDate = data.result.endDate; // endDate 추가
      this.nickname = data.result.nickname;
      this.username = data.result.username; // username 추가
      this.profileImage = data.result.profileImage;
      this.createdAt = data.result.createdAt;
      this.lastModifiedAt = data.result.lastModifiedAt; // lastModifiedAt 추가
      
      // positionDtoList 처리
      this.positionDtoList = data.result.positionDtoList.map((position) => ({
        positionName: position.positionName,
        requiredCount: position.requiredCount,
        currentCount: position.currentCount
      }));

      // techStackDtoList 처리 (기존의 불필요한 코드 삭제)
      this.techStackDtoList = data.result.techStackDtoList || []; // 기본값은 빈 배열
    },
    updatePosition(index) {
      if (this.positionDtoList[index]) {
        this.positionDtoList[index].currentCount++;
      }
    },
    loadPositions(positions) {
      this.positionDtoList = positions;
    }
  }
});
