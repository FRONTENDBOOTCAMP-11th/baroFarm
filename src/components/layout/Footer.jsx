import NavItem from "@components/NavItem";

const icons = {
  category: {
    default: "/icons/icon_category_empty.svg",
    active: "/icons/icon_category_full.svg",
  },
  community: {
    default: "/icons/icon_comm_empty.svg",
    active: "/icons/icon_comm_full.svg",
  },
  home: {
    default: "/icons/icon_home_empty.svg",
    active: "/icons/icon_home_full.svg",
  },
  profile: {
    default: "/icons/icon_profile_empty.svg",
    active: "/icons/icon_profile_full.svg",
  },
  cart: {
    default: "/icons/icon_cart_empty.svg",
    active: "/icons/icon_cart_full.svg",
  },
};

export default function Footer() {
  return (
    <nav className="h-[100px] border-t border-gray1 flex items-center justify-around fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-white">
      <NavItem
        to="/menu"
        defaultIcon={icons.category.default}
        activeIcon={icons.category.active}
        label="카테고리"
      />
      <NavItem
        to="/board"
        defaultIcon={icons.community.default}
        activeIcon={icons.community.active}
        label="커뮤니티"
      />
      <NavItem
        to="/"
        end
        defaultIcon={icons.home.default}
        activeIcon={icons.home.active}
        label="홈"
      />
      <NavItem
        to="/users"
        defaultIcon={icons.profile.default}
        activeIcon={icons.profile.active}
        label="프로필"
      />
      <NavItem
        to="/cart"
        defaultIcon={icons.cart.default}
        activeIcon={icons.cart.active}
        label="장바구니"
      />
    </nav>
  );
}
