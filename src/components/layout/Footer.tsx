export default function Footer() {
  return (
    <footer className="border-t border-[rgba(200,170,100,0.15)] bg-[rgba(255,248,230,0.3)] px-4 py-6 text-center text-xs text-[#8A7D6B]">
      <p className="font-medium text-[#5A5040]">마을광장</p>
      <p className="mt-1">사업자등록번호: 000-00-00000 | 대표: 홍길동</p>
      <p>서울특별시 강남구 테헤란로 123</p>
      <div className="mt-3 flex items-center justify-center gap-3">
        <a href="#" className="hover:text-[#B8820A]">이용약관</a>
        <span>·</span>
        <a href="#" className="font-medium hover:text-[#B8820A]">개인정보처리방침</a>
        <span>·</span>
        <a href="#" className="hover:text-[#B8820A]">고객센터</a>
      </div>
      <p className="mt-3">© 2026 마을광장. All rights reserved.</p>
    </footer>
  )
}
