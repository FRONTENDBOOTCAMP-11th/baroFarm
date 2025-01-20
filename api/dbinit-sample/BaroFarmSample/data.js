import moment from "moment";

function getTime(day = 0, second = 0) {
  return moment().add(day, "days").add(second, "seconds").format("YYYY.MM.DD HH:mm:ss");
}

export const initData = async (clientId, nextSeq) => {
  return {
    // 회원
    user: [
      {
        _id: await nextSeq("user"),
        email: "admin@market.com",
        password: "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "무지",
        phone: "01011112222",
        address: "서울시 강남구 역삼동 123",
        type: "admin",
        loginType: "email",
        image: `/files/${clientId}/user-muzi.webp`,
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        extra: {
          birthday: "03-23",
          membershipClass: "MC03",
          addressBook: [
            {
              id: 1,
              name: "집",
              value: "서울시 강남구 역삼동 123",
            },
            {
              id: 2,
              name: "회사",
              value: "서울시 강남구 신사동 234",
            },
          ],
        },
      },
      {
        _id: await nextSeq("user"),
        email: "s1@market.com",
        password: "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "네오",
        phone: "01022223333",
        address: "서울시 강남구 삼성동 456",
        type: "seller",
        loginType: "email",
        image: `/files/${clientId}/user-neo.webp`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
        extra: {
          birthday: "11-23",
          membershipClass: "MC01",
          addressBook: [
            {
              id: 1,
              name: "회사",
              value: "서울시 강남구 삼성동 567",
            },
            {
              id: 2,
              name: "학교",
              value: "서울시 강남구 역삼동 234",
            },
          ],
        },
      },
      {
        _id: await nextSeq("user"),
        email: "s2@market.com",
        password: "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "어피치",
        phone: "01033334444",
        address: "서울시 강남구 도곡동 789",
        type: "seller",
        loginType: "email",
        image: `/files/${clientId}/user-apeach.webp`,
        createdAt: getTime(-40, -60 * 30),
        updatedAt: getTime(-30, -60 * 20),
        extra: {
          confirm: false, // 관리자 승인이 안됨
          birthday: "11-24",
          membershipClass: "MC02",
          addressBook: [
            {
              id: 1,
              name: "회사",
              value: "서울시 마포구 연희동 123",
            },
            {
              id: 2,
              name: "가게",
              value: "서울시 강남구 학동 234",
            },
          ],
        },
      },
      {
        _id: await nextSeq("user"),
        email: "u1@market.com",
        password: "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "제이지",
        phone: "01044445555",
        address: "서울시 강남구 논현동 222",
        type: "user",
        loginType: "email",
        image: `/files/${clientId}/user-jayg.webp`,
        createdAt: getTime(-20, -60 * 30),
        updatedAt: getTime(-10, -60 * 60 * 12),
        extra: {
          birthday: "11-30",
          membershipClass: "MC02",
          address: [
            {
              id: 1,
              name: "회사",
              value: "서울시 강동구 천호동 123",
            },
            {
              id: 2,
              name: "집",
              value: "서울시 강동구 성내동 234",
            },
          ],
        },
      },
    ],
    // 상품
    product: [
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 20000,
        shippingFees: 2500,
        show: true,
        active: true,
        name: "[1+1] 저탄소 GAP 샤인머스캣 포도 1kg+1kg",
        quantity: 1000,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sample-shine.png`,
            name: "sample-shine.png",
            originalname: "샤인 머스캣.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>안녕하세요 3대째 포도 및 복숭아를 재배하고 있는 박수병입니다. 대표 여름 과일들은 모두 취급하고 있어요. 오랜 기간 동안 어렵다는 여름 과일들을 재배하면서 얻은 노하우로 높은 당도와 고품질의 샤인 머스캣을 보내드릴 수 있도록 하겠습니다. 탐스러운 샤인머스캣 한번 드셔보세요^^</p>
          </div>`,
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          isNew: true,
          isBest: true,
          category: "fruit",
          sort: 5,
          rating: 4.2,
          sale: 22,
          saledPrice: 15600,
          bestMonth: [7, 8, 9],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 30000,
        shippingFees: 2500,
        show: true,
        active: true,
        name: "새콤달콤 써니돌체 국산 적포도 1.4kg 내외 (2송이)",
        quantity: 1000,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sample-grape.png`,
            name: "sample-grape.png",
            originalname: "적포도.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>새콤달콤한 맛을 느껴보세요 짧은 기간동안 맛보실 수 있는 새콤달콤 적포도입니다.</p>
          </div>`,
        createdAt: getTime(-38, -60 * 60 * 6),
        updatedAt: getTime(-33, -60 * 55),
        extra: {
          isNew: false,
          isBest: true,
          category: "fruit",
          sort: 4,
          rating: 4.1,
          sale: 28,
          saledPrice: 21600,
          bestMonth: [1],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 1,
        price: 13000,
        shippingFees: 2500,
        show: true,
        active: true,
        name: "아삭 달큰한 제주 구좌 흙 당근 (중/특상) 3kg",
        quantity: 1000,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sample-carrot.png`,
            name: "sample-carrot.png",
            originalname: "당근.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>당근 상세 설명</p>
          </div>`,
        createdAt: getTime(-35, -60 * 60 * 6),
        updatedAt: getTime(-10, -60 * 19),
        extra: {
          isNew: true,
          isBest: true,
          category: "vegetable",
          sort: 3,
          rating: 3.5,
          sale: 28,
          saledPrice: 9360,
          bestMonth: [1],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 25000,
        shippingFees: 2500,
        show: true,
        active: true,
        name: "54년 전통 얼갈이 김치 1kg",
        quantity: 1000,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sample-kimchi.png`,
            name: "sample-kimchi.png",
            originalname: "김치.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>얼갈이 김치 상세 설명</p>
          </div>`,
        createdAt: getTime(-33, -60 * 60 * 7),
        updatedAt: getTime(-22, -60 * 60 * 3),
        extra: {
          isNew: false,
          isBest: true,
          category: "kimchi",
          sort: 1,
          rating: 4.8,
          sale: 30,
          saledPrice: 17500,
          bestMonth: [1],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 30000,
        shippingFees: 2500,
        show: true,
        active: true,
        name: "[대용량 특가] 자연치즈로 만든 진한 화덕 피자 2판(페페로니, 베이컨 체다치즈)",
        quantity: 1000,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sample-pizza.png`,
            name: "sample-pizza.png",
            originalname: "피자.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>진짜 진짜 짱 맛있는 피자 상세 설명 진짜 진짜 짱 맛있는 피자 상세 설명 진짜 진짜 짱 맛있는 피자 상세 설명 진짜 진짜 짱 맛있는 피자 상세 설명 진짜 진짜 짱 맛있는 피자 상세 설명 진짜 진짜 짱 맛있는 피자 상세 설명 진짜 진짜 짱 맛있는 피자 상세 설명 진짜 진짜 짱 맛있는 피자 상세 설명</p>
          </div>`,
        createdAt: getTime(-30, -60 * 60 * 10),
        updatedAt: getTime(-10, -60 * 56),
        extra: {
          isNew: true,
          isBest: false,
          today: true,
          category: "simple",
          sort: 2,
          rating: 5,
          sale: 25,
          saledPrice: 22500,
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 18000,
        shippingFees: 2500,
        show: true,
        active: true,
        name: "기름 한방울 없이 바삭한 닭다리 치킨 450g*2팩",
        quantity: 1000,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sample-chicken.png`,
            name: "sample-chicken.png",
            originalname: "치킨.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>맛있어 죽겠는 치킨~~</p>
          </div>`,
        createdAt: getTime(-30, -60 * 60 * 21),
        updatedAt: getTime(-20, -60 * 10),
        extra: {
          isNew: false,
          isBest: false,
          category: "simple",
          sort: 1,
          rating: 2,
          sale: 11,
          saledPrice: 16020,
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 24000,
        shippingFees: 2500,
        show: true,
        active: true,
        name: "달큼한 제철 햇밤이 콕콕 박힌 현미밤설기 900g*1팩 / 알밤설기",
        quantity: 1000,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sample-rice.png`,
            name: "sample-rice.png",
            originalname: "설기.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>알밤설기 상세 설명</p>
          </div>`,
        createdAt: getTime(-25, -60 * 60 * 12),
        updatedAt: getTime(-24, -60 * 23),
        extra: {
          isNew: false,
          isBest: true,
          category: "riceCake",
          sort: 3,
          rating: 2.5,
          sale: 18,
          saledPrice: 19680,
          bestMonth: [1, 2],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 12500,
        shippingFees: 2500,
        show: true,
        active: true,
        name: "철저한 관리를 받고 자란 한돈 찜용 갈비 600g (2인분)",
        quantity: 1000,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sample-pork.png`,
            name: "sample-pork.png",
            originalname: "돼지고기.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>돼지고기 상세 설명</p>
          </div>`,
        createdAt: getTime(-22, -60 * 60 * 22),
        updatedAt: getTime(-20, -60 * 33),
        extra: {
          isNew: true,
          isBest: true,
          category: "liveStock",
          sort: 8,
          rating: 3.5,
          sale: 16,
          saledPrice: 10500,
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 9000,
        shippingFees: 2500,
        show: true,
        active: true,
        name: "야들야들 국산 냉동 오리 대패 삼겹살 300g*1봉",
        quantity: 1000,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sample-duck.png`,
            name: "sample-duck.png",
            originalname: "오리고기.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>야들 야들 국산 냉동 오리 대패삼겹살 300g*1봉 상세 설명</p>
          </div>`,
        createdAt: getTime(-21, -60 * 60 * 4),
        updatedAt: getTime(-16, -60 * 15),
        extra: {
          isNew: true,
          isBest: false,
          today: true,
          category: "liveStock",
          sort: 2,
          rating: 4.5,
          sale: 19,
          saledPrice: 7290,
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 26900,
        shippingFees: 2500,
        show: true,
        active: true,
        name: "엄청난 크기의 킹타이거 새우 2마리",
        quantity: 1000,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sample-shrimp.png`,
            name: "sample-shrimp.png",
            originalname: "킹타이거새우.png",
          },
        ],
        content: `
          <div class="product-detail">
            <p>엄청난 크기의 킹타이거 새우 2마리 상세 설명</p>
          </div>`,
        createdAt: getTime(-18, -60 * 60 * 7),
        updatedAt: getTime(-12, -60 * 33),
        extra: {
          isNew: false,
          isBest: true,
          category: "seafood",
          sort: 4,
          rating: 3.7,
          sale: 12,
          saledPrice: 23672,
          bestMonth: [1],
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 21000,
        shippingFees: 2500,
        show: true,
        active: true,
        name: "전통 지주식으로 양식한 무안산 곱창김 50장",
        quantity: 1000,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sample-seaweed.png`,
            name: "sample-seaweed.png",
            originalname: "김.jpg",
          },
          {
            path: `/files/${clientId}/sample-seaweed2.png`,
            name: "sample-seaweed02.png",
            originalname: "김2.png",
          },
        ],
        content: `
          <div align="center"><p>*크리스마스 배송 안내</p></div>
          <div align="center"><p>택배사 물량 증가로 평소보다 2~3일 더 걸립니다.</p></div>
          <div align="center"><br></div>
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-seaweed.png"></div>
          <div align="center"><br></div>
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-seaweed2.png"></div>
          <div align="center"><br></div>
          <div align="center"><p>*반품 안내</p></div>`,
        createdAt: getTime(-16, -60 * 60 * 3),
        updatedAt: getTime(-15, -60 * 45),
        extra: {
          isNew: false,
          isBest: false,
          today: true,
          category: "seafood", // 어린이 > 레고
          sort: 6,
          rating: 2.76,
          sale: 29,
          saledPrice: 14910,
        },
      },
      {
        _id: await nextSeq("product"),
        seller_id: 2,
        price: 43000,
        shippingFees: 2500,
        show: true,
        active: true,
        name: "24년 햅쌀 / 찰지고 윤기나는 백진주 쌀 10kg",
        quantity: 999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sample-rice.png`,
            name: "sample-rice.png",
            originalname: "쌀.png",
          },
        ],
        content: `
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-rice.png"></div>
          <div align="center"><br></div>
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-seaweed.png"></div>
          <div align="center"><br></div>
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-seaweed2.png"></div>
          <div align="center"><br></div>
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-ricecake.png"></div>`,
        createdAt: getTime(-11, -60 * 60 * 12),
        updatedAt: getTime(-5, -60 * 60 * 6),
        extra: {
          isNew: true,
          isBest: true,
          category: "rice",
          sort: 7,
          rating: 3.8,
          sale: 38,
          saledPrice: 26660,
          bestMonth: [9, 10],
        },
      },
      // 13번 상품
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 17000,
        shippingFees: 2500,
        show: true,
        active: true,
        name: "달콤한 과즙 가득 고령 설향 딸기 500g 1팩 (개당 16~20g)",
        quantity: 990,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sample-strawberry.png`,
            name: "sample-strawberry.png",
            originalname: "딸기.png",
          },
        ],
        content: `
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-strawberry.png"></div>
          <div align="center"><br></div>
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-grape.png"></div>
          <div align="center"><br></div>
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-shine.png"></div>`,
        createdAt: getTime(-10, -60 * 60 * 12),
        updatedAt: getTime(-5, -60 * 60 * 6),
        extra: {
          isNew: true,
          isBest: false,
          category: "fruit",
          sort: 6,
          rating: 2.7,
          sale: 27,
          saledPrice: 12410,
          bestMonth: [7, 8],
        },
      },
      // 14번 상품. shippingFees가 없을 경우 config.shippingFees 사용
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 90000,
        shippingFees: 2500,
        show: true,
        active: true,
        name: "[지정일 배송] 명품 프리미엄 혼합 과일 선물세트 1호",
        quantity: 3000,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sample-fruitset.png`,
            name: "sample-fruitset.png",
            originalname: "과일세트.png",
          },
          {
            path: `/files/${clientId}/sample-grape.png`,
            name: "sample-grape.png",
            originalname: "포도.png",
          },
          {
            path: `/files/${clientId}/sample-shine.png`,
            name: "sample-shine.png",
            originalname: "샤인머스캣.png",
          },
        ],
        content: `
          <div align="center"><p>과일 세트를 구매하시는 모든 분께 사은품(무작위)으로 하나 더 드립니다.</p></div>
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-shine.png"></div>
          <div align="center"><br></div>
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-grape.png"></div>
          <div align="center"><br></div>
          <div align="center"><img src="${process.env.API_HOST}/files/${clientId}/sample-fruitset.png"></div>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          isNew: false,
          isBest: true,
          category: "fruit",
          sort: 5,
          rating: 4.5,
          sale: 21,
          saledPrice: 71100,
        },
      },
      // 15번 상품. 옵션이 있는 경우 메인 상품 정보
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 9900,
        shippingFees: 2500,
        show: true,
        active: true,
        name: "씹을수록 달콤한 수미 감자 . 대사이즈(80g~120g) 3kg",
        quantity: 999999,
        buyQuantity: 0,
        mainImages: [
          {
            path: `/files/${clientId}/sample-potato.png`,
            name: "sample-potato.png",
            originalname: "감자.png",
          },
        ],
        content: `<p>짱 맛있는 감자</p>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          isNew: false,
          isBest: true,
          category: "vegetable",
          sort: 5,
          rating: 4.5,
          sale: 28,
          saledPrice: 7128,
          bestMonth: [1],
        },
      },
      // 16번 상품. 옵션이 있는 경우 옵션 상품 정보. 15번 상품의 하위 상품(옵션)
      {
        _id: await nextSeq("product"),
        seller_id: 3,
        price: 16000,
        shippingFees: 2500,
        name: "달콤 촉촉 호풍미(당근) 고구마 특상 3kg",
        quantity: 1000,
        buyQuantity: 0,
        show: true,
        active: true,
        mainImages: [
          {
            path: `/files/${clientId}/sample-sweetpotato.png`,
            name: "sample-sweetpotato.png",
            originalname: "고구마.png",
          },
        ],
        content: `<p>고구마 입니당.</p>`,
        createdAt: getTime(-3, -60 * 60 * 12),
        updatedAt: getTime(-3, -60 * 60 * 12),
        extra: {
          isNew: false,
          isBest: true,
          category: "vegetable",
          sort: 9,
          rating: 2.5,
          sale: 18,
          saledPrice: 13120,
          bestMonth: [1],
        },
      },
    ],
    // 주문
    order: [
      {
        _id: await nextSeq("order"),
        user_id: 4,
        state: "OS020",
        products: [
          {
            _id: 2,
            seller_id: 2,
            state: "OS020",
            name: "헬로카봇 스톰다이버",
            image: {
              path: `/files/${clientId}/sample-diver.jpg`,
              name: "sample-diver.jpg",
              originalname: "헬로카봇.jpg",
            },
            quantity: 2,
            price: 34520,
            review_id: 3,
          },
        ],
        cost: {
          products: 34520,
          shippingFees: 2500,
          discount: {
            products: 0,
            shippingFees: 0,
          },
          total: 37020,
        },
        address: {
          name: "회사",
          value: "서울시 강남구 신사동 234",
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq("order"),
        user_id: 4,
        state: "OS010",
        products: [
          {
            _id: 3,
            seller_id: 2,
            state: "OS010",
            name: "레고 클래식 라지 조립 박스 10698",
            image: {
              path: `/files/${clientId}/sample-classic.jpg`,
              name: "sample-classic.jpg",
              originalname: "레고 클래식.jpg",
            },
            quantity: 1,
            price: 48870,
          },
          {
            _id: 4,
            seller_id: 3,
            state: "OS010",
            name: "레고 테크닉 42151 부가티 볼리드",
            image: {
              path: `/files/${clientId}/sample-bugatti.png`,
              name: "sample-bugatti.png",
              originalname: "부가티.png",
            },
            quantity: 2,
            price: 90000,
            review_id: 2,
          },
        ],
        cost: {
          products: 138840,
          shippingFees: 3500,
          discount: {
            products: 13880,
            shippingFees: 3500,
          },
          total: 124960,
        },
        address: {
          name: "집",
          value: "서울시 강남구 역삼동 123",
        },
        createdAt: getTime(-4, -60 * 60 * 22),
        updatedAt: getTime(-2, -60 * 60 * 12),
      },
      {
        _id: await nextSeq("order"),
        user_id: 4,
        state: "OS040",
        products: [
          {
            _id: 4,
            seller_id: 3,
            state: "OS110",
            name: "레고 테크닉 42151 부가티 볼리드",
            image: {
              path: `/files/${clientId}/sample-bugatti.png`,
              name: "sample-bugatti.png",
              originalname: "부가티.png",
            },
            quantity: 1,
            price: 45000,
            review_id: 1,
          },
        ],
        cost: {
          products: 45000,
          shippingFees: 3500,
          discount: {
            products: 4500,
            shippingFees: 0,
          },
          total: 44000,
        },
        address: {
          name: "학교",
          value: "서울시 강남구 역삼동 234",
        },
        payment: {
          success: true,
          imp_uid: "imp_138601212227",
          pay_method: "card",
          merchant_uid: "mid_1702540599641",
          name: "레고 테크닉 42151 부가티 볼리드",
          paid_amount: 45000,
          currency: "KRW",
          pg_provider: "html5_inicis",
          pg_type: "payment",
          pg_tid: "StdpayCARDINIpayTest20231214165706277441",
          apply_num: "30123157",
          buyer_name: "제이지",
          buyer_email: "aceppin@daum.net",
          buyer_tel: "01044445555",
          buyer_addr: "",
          buyer_postcode: "",
          custom_data: null,
          status: "paid",
          paid_at: 1702540626,
          receipt_url: "https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/mCmReceipt_head.jsp?noTid=StdpayCARDINIpayTest20231214165706277441&noMethod=1",
          card_name: "국민KB카드",
          bank_name: null,
          card_quota: 0,
          card_number: "457973*********5",
        },
        delivery: {
          company: "한진 택배",
          trackingNumber: "364495958003",
          url: "https://trace.cjlogistics.com/next/tracking.html?wblNo=364495958003",
        },
        createdAt: getTime(-3, -60 * 60 * 18),
        updatedAt: getTime(-1, -60 * 60 * 1),
      },
      {
        _id: await nextSeq("order"),
        user_id: 2,
        state: "OS040",
        products: [
          {
            _id: 2,
            seller_id: 2,
            state: "OS310",
            name: "헬로카봇 스톰다이버",
            image: {
              path: `/files/${clientId}/sample-diver.jpg`,
              name: "sample-diver.jpg",
              originalname: "헬로카봇.jpg",
            },
            quantity: 1,
            price: 17260,
            review_id: 2,
          },
        ],
        cost: {
          products: 17260,
          shippingFees: 2500,
          discount: {
            products: 0,
            shippingFees: 0,
          },
          total: 19760,
        },
        address: {
          name: "학교",
          value: "서울시 강남구 역삼동 234",
        },
        delivery: {
          company: "한진 택배",
          trackingNumber: "364495958003",
          url: "https://trace.cjlogistics.com/next/tracking.html?wblNo=364495958003",
        },
        createdAt: getTime(-3, -60 * 60 * 18),
        updatedAt: getTime(-1, -60 * 60 * 1),
      },
    ],
    // 후기
    review: [
      {
        _id: await nextSeq("review"),
        user_id: 4,
        user: {
          _id: 4,
          name: "제이지",
          image: "user-jayg.webp",
        },
        order_id: 1,
        product_id: 2,
        rating: 5,
        content: "아이가 좋아해요.",
        createdAt: getTime(-4, -60 * 60 * 12),
      },
      {
        _id: await nextSeq("review"),
        user_id: 2,
        user: {
          _id: 2,
          name: "네오",
          image: "user-neo.webp",
        },
        order_id: 4,
        product_id: 2,
        rating: 4,
        content: "배송이 좀 느려요.",
        createdAt: getTime(-3, -60 * 60 * 1),
      },
      {
        _id: await nextSeq("review"),
        user_id: 4,
        user: {
          _id: 4,
          name: "제이지",
          image: "user-jayg.webp",
        },
        order_id: 2,
        product_id: 3,
        rating: 1,
        content: "상해서 도착했어요",
        extra: {
          title: "추천하지 않습니다.",
        },
        createdAt: getTime(-2, -60 * 60 * 10),
      },
      {
        _id: await nextSeq("review"),
        user_id: 4,
        user: {
          _id: 4,
          name: "제이지",
          image: "user-jayg.webp",
        },
        order_id: 5,
        product_id: 2,
        rating: 5,
        content: "너무 너무 맛있어요 추천드립니다! 너무 너무 맛있어요 추천드립니다! 너무 너무 맛있어요 추천드립니다! 너무 너무 맛있어요 추천드립니다!",
        createdAt: getTime(-4, -60 * 60 * 12),
      },
      {
        _id: await nextSeq("review"),
        user_id: 3,
        user: {
          _id: 3,
          name: "어피치",
          image: "user-apeach.webp",
        },
        order_id: 6,
        product_id: 2,
        rating: 1,
        content: "너무 너무 별로에요 사지마세요 ㅠㅠ 너무 너무 별로에요 사지마세요 ㅠㅠ 너무 너무 별로에요 사지마세요 ㅠㅠ",
        createdAt: getTime(-4, -60 * 60 * 12),
      },
      {
        _id: await nextSeq("review"),
        user_id: 3,
        user: {
          _id: 3,
          name: "어피치",
          image: "user-apeach.webp",
        },
        order_id: 7,
        product_id: 2,
        rating: 3,
        content: "나쁘지 않아요~",
        createdAt: getTime(-4, -60 * 60 * 12),
      },
      {
        _id: await nextSeq("review"),
        user_id: 3,
        user: {
          _id: 3,
          name: "어피치",
          image: "user-apeach.webp",
        },
        order_id: 8,
        product_id: 2,
        rating: 2,
        content: "별로 ㅋ",
        createdAt: getTime(-4, -60 * 60 * 12),
      },
    ],
    // 장바구니
    cart: [
      {
        _id: await nextSeq("cart"),
        user_id: 4,
        product_id: 1,
        quantity: 2,
        createdAt: getTime(-7, -60 * 30),
        updatedAt: getTime(-7, -60 * 30),
      },
      {
        _id: await nextSeq("cart"),
        user_id: 4,
        product_id: 2,
        quantity: 1,
        createdAt: getTime(-4, -60 * 30),
        updatedAt: getTime(-3, -60 * 60 * 12),
      },
      {
        _id: await nextSeq("cart"),
        user_id: 2,
        product_id: 3,
        quantity: 2,
        createdAt: getTime(-3, -60 * 60 * 4),
        updatedAt: getTime(-3, -60 * 60 * 4),
      },
      {
        _id: await nextSeq("cart"),
        user_id: 2,
        product_id: 4,
        quantity: 3,
        createdAt: getTime(-2, -60 * 60 * 12),
        updatedAt: getTime(-1, -60 * 60 * 20),
      },
    ],
    // 즐겨찾기/북마크
    bookmark: [
      {
        _id: await nextSeq("bookmark"),
        user_id: 4,
        user: {
          _id: 4,
          name: "제이지",
          image: `/files/${clientId}/user-jayg.webp`,
        },
        type: "product",
        target_id: 2,
        memo: "첫째 크리스마스 선물.",
        createdAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("bookmark"),
        user_id: 4,
        user: {
          _id: 4,
          name: "제이지",
          image: `/files/${clientId}/user-jayg.webp`,
        },
        type: "product",
        target_id: 4,
        memo: "둘째 생일 선물",
        createdAt: getTime(-1, -60 * 60 * 12),
      },
      {
        _id: await nextSeq("bookmark"),
        user_id: 4,
        user: {
          _id: 4,
          name: "제이지",
          image: `/files/${clientId}/user-jayg.webp`,
        },
        type: "user",
        target_id: 2,
        memo: "단골 셀러",
        createdAt: getTime(-2, -60 * 60 * 20),
      },
      {
        _id: await nextSeq("bookmark"),
        user_id: 4,
        user: {
          _id: 4,
          name: "제이지",
          image: `/files/${clientId}/user-jayg.webp`,
        },
        type: "post",
        target_id: 1,
        memo: "크기 문의글 북마크",
        createdAt: getTime(-1, -60 * 60 * 12),
      },
      {
        _id: await nextSeq("bookmark"),
        user_id: 2,
        user: {
          _id: 2,
          name: "네오",
          image: `/files/${clientId}/user-neo.webp`,
        },
        type: "product",
        target_id: 4,
        memo: "1순위로 살것!",
        createdAt: getTime(-1, -60 * 60 * 12),
      },
    ],
    // QnA, 공지사항 등의 게시판
    post: [
      {
        _id: await nextSeq("post"),
        type: "qna",
        product_id: 1,
        seller_id: 2,
        views: 5,
        user: {
          _id: 4,
          name: "제이지",
          image: "user-jayg.webp",
        },
        title: "크기가 얼만만한가요?",
        content: "아이가 6살인데 가지고 놀기 적당한 크기인가요?",
        replies: [
          {
            _id: 1,
            user_id: 2,
            user: {
              _id: 2,
              name: "네오",
              image: "user-neo.webp",
            },
            content: "크기는 상품 상세정보에 나와 있습니다.",
            like: 5,
            createdAt: getTime(-2, -60 * 60 * 20),
            updatedAt: getTime(-2, -60 * 60 * 2),
          },
          {
            _id: 2,
            user_id: 4,
            user: {
              _id: 4,
              name: "제이지",
              image: "user-jayg.webp",
            },
            content: "어디있나 모르겠어요.",
            like: 7,
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
          {
            _id: 3,
            user_id: 2,
            user: {
              _id: 2,
              name: "네오",
              image: "user-neo.webp",
            },
            content: "높이 60cm 입니다.",
            like: 3,
            createdAt: getTime(-2, -60 * 60 * 9),
            updatedAt: getTime(-1, -60 * 60 * 20),
          },
        ],
        createdAt: getTime(-3, -60 * 60 * 2),
        updatedAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("post"),
        type: "qna",
        product_id: 1,
        seller_id: 2,
        views: 50,
        user: {
          _id: 4,
          name: "제이지",
          image: "user-jayg.webp",
        },
        title: "이번주 토요일까지 받아볼 수 있을까요?",
        content: "토요일 생일 선물로 준비중인데 그때까지 배송 가능할까요?",
        createdAt: getTime(-2, -60 * 60 * 1),
        updatedAt: getTime(-1, -60 * 60 * 20),
      },
      {
        _id: await nextSeq("post"),
        type: "qna",
        product_id: 4,
        seller_id: 3,
        views: 0,
        user: {
          _id: 2,
          name: "네오",
          image: "user-neo.webp",
        },
        title: "배송 빨리 보내주세요.",
        content: "양품으로 보내주세요.",
        createdAt: getTime(-1, -60 * 60 * 14),
        updatedAt: getTime(-1, -60 * 60 * 2),
      },
      {
        _id: await nextSeq("post"),
        type: "notice",
        views: 10,
        user: {
          _id: 1,
          name: "무지",
          image: "user-muzi.webp",
        },
        title: "배송지연 안내",
        content: "크리스마스 물류 증가로 인해 평소보다 2~3일 지연될 예정입니다.",
        createdAt: getTime(-4, -60 * 60 * 2),
        updatedAt: getTime(-2, -60 * 60 * 13),
      },
      {
        _id: await nextSeq("post"),
        type: "notice",
        views: 15,
        user: {
          _id: 1,
          name: "무지",
          image: "user-muzi.webp",
        },
        title: "배송비 인상 안내",
        content: "택배사 배송비 인상으로 인해 기존 3,000원에서 3,500원으로 인상됩니다.",
        createdAt: getTime(-6, -60 * 60 * 20),
        updatedAt: getTime(-4, -60 * 60 * 13),
      },
      {
        _id: await nextSeq("post"),
        type: "community",
        views: 15,
        image: "/images/Sample_magoli.jpg",
        bookmarks: 0,
        user: {
          _id: 2,
          name: "네오",
          image: "/files/final04/user-neo.webp",
        },
        content: "술 한 잔과 하는 여유로운 시간이군요~",
        createdAt: getTime(-10, -60 * 60 * 13),
        updatedAt: getTime(-10, -60 * 60 * 13),
      },
      {
        _id: await nextSeq("post"),
        type: "community",
        views: 25,
        image: "/images/Logo_old.svg",
        bookmarks: 0,
        user: {
          _id: 2,
          name: "네오",
          image: "/files/final04/user-neo.webp",
        },
        content: "그거 아시나요? 이 사이트는 원래 농담이라는 이름을 가지고 있었습니다.",
        createdAt: getTime(-9, -60 * 60 * 20),
        updatedAt: getTime(-9, -60 * 60 * 13),
      },
      {
        _id: await nextSeq("post"),
        type: "community",
        views: 563,
        image: "/images/Sample2.svg",
        bookmarks: 0,
        user: {
          _id: 3,
          name: "어피치",
          image: "/files/final04/user-apeach.webp",
        },
        content: "이런 재미있는 공간이 있다니! 발견한 기념으로 귀여운 강아지~",
        createdAt: getTime(-8, -60 * 60 * 20),
        updatedAt: getTime(-8, -60 * 60 * 20),
      },
      {
        _id: await nextSeq("post"),
        type: "community",
        views: 62,
        image: "/images/Sample_apple.jpg",
        bookmarks: 0,
        user: {
          _id: 4,
          name: "제이지",
          image: "/files/final04/user-jayg.webp",
        },
        content:
          "청사과는 신 맛이 강하지만 그만큼 단단하죠. 저는 그래서 청사과를 많이 먹고 빨간 사과는 요리에 써요!",
        createdAt: getTime(-8, -60 * 60 * 16),
        updatedAt: getTime(-8, -60 * 60 * 16),
      },
      {
        _id: await nextSeq("post"),
        type: "community",
        views: 15,
        image: "/images/Sample_kimchiCake.jpg",
        bookmarks: 0,
        user: {
          _id: 1,
          name: "무지",
          image: "/files/final04/user-muzi.webp",
        },
        content: "이 김치전.... 눅눅하다....",
        createdAt: getTime(-7, -60 * 60 * 20),
        updatedAt: getTime(-7, -60 * 60 * 20),
      },
      {
        _id: await nextSeq("post"),
        type: "community",
        views: 124,
        image: "/images/Sample_Sushi.png",
        bookmarks: 0,
        user: {
          _id: 1,
          name: "무지",
          image: "/files/final04/user-muzi.webp",
        },
        content: "오늘 마트에서 사서 먹어보는 초밥!",
        createdAt: getTime(-7, -60 * 60 * 15),
        updatedAt: getTime(-7, -60 * 60 * 15),
      },
      {
        _id: await nextSeq("post"),
        type: "community",
        views: 45,
        image: "/images/Sample_pizza.jpg",
        bookmarks: 0,
        user: {
          _id: 3,
          name: "어피치",
          image: "/files/final04/user-apeach.webp",
        },
        content: "가끔은 피자가 땡기는 날이 있죠! 마침 집에 쟤료가 있어서 한 번 만들어봤습니다~",
        createdAt: getTime(-7, -60 * 60 * 8),
        updatedAt: getTime(-7, -60 * 60 * 8),
      },
      {
        _id: await nextSeq("post"),
        type: "community",
        views: 185,
        image: "/images/Sample2.svg",
        bookmarks: 0,
        user: {
          _id: 1,
          name: "무지",
          image: "/files/final04/user-muzi.webp",
        },
        content: "강아지 대신 햄쥐!",
        createdAt: getTime(-7, -60 * 60 * 20),
        updatedAt: getTime(-7, -60 * 60 * 20),
      },
      {
        _id: await nextSeq("post"),
        type: "community",
        views: 15,
        image: "/files/final04/sample_fruitset.png",
        bookmarks: 0,
        user: {
          _id: 4,
          name: "제이지",
          image: "/files/final04/user-jayg.webp",
        },
        content: "과일들이 참 탐스럽게 생겼네요. 벌써부터 입 안에 침이 고여요.",
        createdAt: getTime(-4, -60 * 60 * 20),
        updatedAt: getTime(-4, -60 * 60 * 20),
      },
    ],
    // 코드
    code: [
      {
        _id: "productCategory",
        title: "상품 카테고리",
        codes: [
          {
            sort: 1,
            code: "fruit",
            value: "제철과일",
            depth: 1,
          },
          {
            sort: 2,
            code: "vegetable",
            value: "채소",
            depth: 1,
          },
          {
            sort: 3,
            code: "kimchi",
            value: "김치",
            depth: 1,
          },
          {
            sort: 4,
            code: "liveStock",
            value: "축산물",
            depth: 1,
          },
          {
            sort: 5,
            code: "seafood",
            value: "수산물",
            depth: 1,
          },
          {
            sort: 6,
            code: "simple",
            value: "간편식",
            depth: 1,
          },
          {
            sort: 7,
            code: "riceCake",
            value: "떡",
            depth: 1,
          },
          {
            sort: 8,
            code: "rice",
            value: "쌀 / 잡곡",
            depth: 1,
          },
        ],
      },
      {
        _id: "orderState",
        title: "주문 상태",
        codes: [
          {
            sort: 1,
            code: "OS010",
            value: "주문 완료",
          },
          {
            sort: 2,
            code: "OS020",
            value: "결제 완료",
          },
          {
            sort: 3,
            code: "OS030",
            value: "배송 준비중",
          },
          {
            sort: 4,
            code: "OS035",
            value: "배송중",
          },
          {
            sort: 5,
            code: "OS040",
            value: "배송 완료",
          },
          {
            sort: 6,
            code: "OS110",
            value: "반품 요청",
          },
          {
            sort: 7,
            code: "OS120",
            value: "반품 처리중",
          },
          {
            sort: 8,
            code: "OS130",
            value: "반품 완료",
          },
          {
            sort: 9,
            code: "OS210",
            value: "교환 요청",
          },
          {
            sort: 10,
            code: "OS220",
            value: "교환 처리중",
          },
          {
            sort: 11,
            code: "OS230",
            value: "교환 완료",
          },
          {
            sort: 12,
            code: "OS310",
            value: "환불 요청",
          },
          {
            sort: 13,
            code: "OS320",
            value: "환불 처리중",
          },
          {
            sort: 14,
            code: "OS330",
            value: "환불 완료",
          },
        ],
      },
      {
        _id: "membershipClass",
        title: "회원 등급",
        codes: [
          {
            sort: 1,
            code: "MC01",
            value: "일반",
            discountRate: 0, // 할인율
          },
          {
            sort: 2,
            code: "MC02",
            value: "프리미엄",
            discountRate: 10,
          },
          {
            sort: 3,
            code: "MC03",
            value: "VIP",
            discountRate: 20,
          },
        ],
      },
    ],
    // 설정
    config: [
      {
        _id: "shippingFees",
        title: "배송비",
        value: 2500,
      },
      {
        _id: "freeShippingFees",
        title: "배송비 무료 금액",
        value: 30000,
      },
    ],
  };
};
