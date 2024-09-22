"use client";

import React from "react";

const PrivacyPage = () => {
  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-col items-center delay-150 duration-300 laptop:px-16 laptop:py-6 desktop:px-8">
      <div className="p-4">
        <h1 className="mobile:text-xl mb-4 text-2xl font-bold laptop:text-3xl desktop:text-4xl">
          딥트리 개인정보 처리방침
        </h1>

        <p className="mobile:text-sm mb-4 laptop:text-base desktop:text-lg">
          딥트리(이하 &quot;회사&quot;)는 『정보통신망 이용촉진 및 정보보호 등에
          관한 법률』, 『통신비밀보호법』, 『전기통신사업법』,
          『개인정보보호법』 등 정보통신서비스제공자가 준수하여야 할 관련
          법령상의 개인정보보호 규정을 준수하며, 관련 법령에 의거한
          개인정보처리방침을 정하여 이용자의 권익 보호에 최선을 다하고 있습니다.
          본 개인정보처리방침은 이용자가 회사가 관리 · 운영하는 서비스
          플랫폼(웹, 모바일 웹 · 앱 포함, 이하 &apos;플랫폼&apos;이라
          합니다)에서 제공하는 서비스(이하 &apos;서비스&apos;라 합니다)를
          이용함에 적용되며, 다음과 같은 내용을 담고 있습니다.
        </p>

        <h2 className="mobile:text-lg mt-4 text-xl font-semibold laptop:text-2xl desktop:text-3xl">
          제1조 (수집하는 개인정보 항목 및 수집방법)
        </h2>
        <p className="mobile:text-sm laptop:text-base desktop:text-lg">
          ① 회사는 이용자의 회원가입 및 관리, 각종 서비스 제공, 원활한 고충처리,
          맞춤형 서비스 제공을 위해 이용자로부터 최소한의 개인정보를 수집하고
          있습니다.
        </p>
        <p className="mobile:text-sm laptop:text-base desktop:text-lg ">
          ② 제1항의 개인정보 항목 외에 서비스 이용 과정이나 앱 실행 과정에서 IP
          Address, 쿠키, 방문일시, 서비스 이용기록, 불량 이용기록, 기기정보가
          수집될 수 있으며, 고객 문의 접수 및 처리 과정에서 이메일 주소나
          전화번호가 수집될 수 있습니다.
        </p>
        <p className="mobile:text-sm laptop:text-base desktop:text-lg ">
          ③ 회사가 제공하는 서비스 이용과정에서 이용자의 식별 및 본인여부, 연령
          확인이 필요한 경우 이름, 생년월일, 성별, 내외국인정보, 휴대폰번호 또는
          아이핀번호, 암호화된 동일인 식별연계정보(CI), 중복가입확인정보(DI).
          미성년자의 경우 법정대리인정보가 자동으로 생성 및 추가되어 수집될 수
          있습니다.
        </p>
        <p className="mobile:text-sm laptop:text-base desktop:text-lg ">
          ④ 회사는 이용자의 기본적 인권 침해 우려가 있는 민감한 개인정보(인종,
          사상, 신조, 정치적 성향, 범죄기록, 의료정보 등)는 수집하지 않습니다.
        </p>
        <p className="mobile:text-sm laptop:text-base desktop:text-lg ">
          ⑤ 회사는 수집한 개인정보를 수집 목적 이외의 용도로 사용되지 않으며
          수집 및 이용 목적이 변경될 시에는 이용자로부터 별도의 사전동의를
          구합니다.
        </p>
        <p className="mobile:text-sm laptop:text-base desktop:text-lg ">
          ⑥ 회사는 다음과 같은 방법으로 이용자의 개인정보를 수집할 수 있습니다.
        </p>
        <ul className="mobile:text-sm mb-4 list-disc pl-6 laptop:text-base desktop:text-lg">
          <li>
            홈페이지, 모바일기기, 서면양식, 팩스, 전화, 상담 게시판, 이메일,
            이벤트 응모, 배송요청
          </li>
          <li>생성정보 수집 툴을 통한 수집</li>
        </ul>

        <h2 className="mobile:text-lg mb-2 mt-4 text-xl font-semibold laptop:text-2xl desktop:text-3xl">
          제2조 (수집한 개인정보의 이용목적)
        </h2>
        <p className="mobile:text-sm mb-2 laptop:text-base desktop:text-lg">
          회사는 이용자로부터 수집한 정보를 다음과 같은 목적을 위해 활용합니다.
        </p>
        <ol className="mobile:text-sm mb-4 list-decimal pl-6 laptop:text-base desktop:text-lg">
          <li>
            회원가입, 원활한 고객상담, 이용자와 약속한 서비스 제공, 서비스
            제공에 따른 본인인증, 구매 및 요금결제, 회사의 서비스 이용내역 제공,
            결제 수단의 등록 등을 위하여 개인정보를 이용합니다.
          </li>
          <li>
            회원 가입 의사의 확인, 연령 확인 및 법정대리인 동의 진행, 이용자 및
            법정대리인의 본인 확인, 이용자 식별, 회원탈퇴 의사의 확인, 문의사항
            또는 불만처리 등 회원관리를 위하여 개인정보를 이용합니다.
          </li>
          <li>
            법령 및 회사가 정한 정책(서비스 이용약관 등 포함)을 위반하는
            이용자에 대한 이용 제한 조치, 부정 이용 행위를 포함하여 서비스의
            원활한 운영에 지장을 주는 행위 및 비인가 행위에 대한 방지 및 제재,
            계정도용 및 부정거래 방지, 고지사항 전달, 분쟁 조정을 위한 기록보존
            등 이용자 보호 및 서비스 이용환경을 확인하고 안정적인 운영을 위하여
            개인정보를 이용합니다.
          </li>
          <li>
            인구통계학적 특성에 따른 서비스 제공, 접속 빈도 분석, 기능개선,
            서비스 이용에 대한 통계, 서비스 분석 및 통계에 기반하여 이용자의
            유료서비스 구매(결제) 및 서비스 이용 성향, 관심, 이용기록 분석 등을
            반영한 신규 서비스 제공 등에 개인정보를 이용합니다.
          </li>
          <li>
            이벤트 정보, 광고성 정보 제공 등 이벤트 및 프로모션의 목적 등에
            개인정보를 이용합니다(마케팅, 광고성 정보 제공 동의 시).
          </li>
        </ol>

        <h2 className="mobile:text-lg mb-2 mt-4 text-xl font-semibold laptop:text-2xl desktop:text-3xl">
          제3조 (개인정보 보유 및 이용기간)
        </h2>
        <p className="mobile:text-sm laptop:text-lg desktop:text-xl">
          회사는 원칙적으로 이용자의 개인정보를 회원 탈퇴 시까지 보유합니다.
          다만, 다음의 사유에 해당하는 경우 해당 사유 종료시까지 개인정보를
          보유합니다.
        </p>
        <p className="mobile:text-sm laptop:text-lg desktop:text-xl">
          ① 기업교육 서비스 제공 시, 기업이 요청한 보유 기간까지 보관합니다.
        </p>
        <p className="mobile:text-sm laptop:text-lg desktop:text-xl">
          ② 회사는 거래 관련 분쟁 방지 등을 위하여 다음과 같은 경우에는 회원
          탈퇴 이후에도 명시한 기간 동안 보유합니다.
        </p>
        <p className="mobile:text-sm laptop:text-lg desktop:text-xl">
          가. 회사 내부 방침에 의한 개인정보 보존 사유
        </p>
        <ul className="mobile:text-sm ml-8 list-disc laptop:text-lg desktop:text-xl">
          <li>
            부정이용의 기록(부정이용이란, ①회사가 정한 정책(약관 등 포함)에
            위배되는 방법이나 내용의 거래, ②회사, 회원, 제3자의 권리나 이익을
            침해하는 방법이나 거래, ③‘①과 ②’에 준하는 내용의 거래를 의미합니다)
          </li>
          <li>보존이유: 부정이용 관리 및 조치</li>
          <li>보존기간: 1년</li>
        </ul>
        <p className="mobile:text-sm laptop:text-lg desktop:text-xl">
          나. 이용자에 대하여 관계 법령 위반에 따른 수사 · 조사 등이 진행중인
          경우: 해당 수사 · 조사 종료 시까지
        </p>
        <p className="mobile:text-sm laptop:text-lg desktop:text-xl">
          다. 회사와 이용자 사이에 채권 · 채무관계가 잔존하는 경우: 해당 채권 ·
          채무관계 정산 완료 시까지
        </p>
        <p className="mobile:text-sm laptop:text-lg desktop:text-xl">
          라. 상법, 『전자상거래 등에서의 소비자보호에 관한 법률』 등 관계
          법령의 규정에 따라 보존할 필요가 있는 경우 회사는 관계 법령에서 정한
          일정한 기간 동안 이용자의 정보를 보존합니다. 이 경우 회사는 보존하는
          정보를 그 보존의 목적으로만 사용하며 보존기간은 아래와 같습니다.
        </p>
        <ul className="mobile:text-sm ml-8 list-disc laptop:text-lg desktop:text-xl">
          <li>
            소비자의 불만 또는 분쟁처리에 관한 기록 보존이유: 전자상거래
            등에서의 소비자보호에 관한 법률 보존기간: 3년
          </li>
          <li>
            계약 또는 청약철회 등에 관한 기록 보존이유: 전자상거래 등에서의
            소비자보호에 관한 법률 보존기간: 5년
          </li>
          <li>
            대금결제 및 재화 등의 공급에 관한 기록 보존이유: 전자상거래 등에서의
            소비자보호에 관한 법률 보존기간: 5년
          </li>
          <li>
            서비스 이용 및 접속에 관한 로그기록 보존이유: 통신비밀보호법
            보존기간: 3개월
          </li>
        </ul>

        <h2 className="mobile:text-lg mb-2 mt-4 text-xl font-semibold laptop:text-2xl desktop:text-3xl">
          제4조 (이용자의 권리 및 의무)
        </h2>

        <p className="mobile:text-sm laptop:text-lg desktop:text-xl">
          ① 이용자는 아래와 같은 권리를 행사할 수 있습니다.
        </p>
        <ol className="mobile:text-sm ml-8 list-decimal laptop:text-lg desktop:text-xl">
          <li>
            이용자는 회사에 대해 언제든지 개인정보 열람, 정정, 삭제, 처리정지
            요구 등의 권리를 행사할 수 있으며, 회원 탈퇴 절차를 통하여 개인정보
            이용에 대한 동의를 철회할 수 있습니다. 이 때 회사는 위의 요구를 한
            자가 본인이거나 정당한 대리인인지를 확인합니다.
          </li>
          <li>
            위 1.에 따른 권리 행사는 회사에 대해 서면, 전자우편, 모사전송(FAX)
            등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이
            조치하겠습니다. 다만 성명, 주민등록번호, 외국인등록번호는 정정하실
            수 없으며, 개명으로 인한 성명 변경 및 행정상의 문제로 인한
            주민(사업자)등록번호 변경은 예외적으로 허용될 수 있습니다.
          </li>
          <li>
            회사는 이용자의 개인정보 처리 정지 요구가 있는 경우에도 아래에
            해당하는 경우에는 처리정지 요구를 거절할 수 있습니다.
            <ul className="ml-8 list-disc">
              <li>
                법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여
                불가피한 경우
              </li>
              <li>
                다른 사람의 생명·신체를 해할 우려가 있거나 다른 사람의 재산과 그
                밖의 이익을 부당하게 침해할 우려가 있는 경우
              </li>
              <li>
                개인정보를 처리하지 아니하면 정보주체와 약정한 서비스를 제공하지
                못하는 등 계약의 이행이 곤란한 경우로서 정보주체가 그 계약의
                해지 의사를 명확하게 밝히지 아니한 경우
              </li>
            </ul>
          </li>
          <li>
            위 1.에 따른 권리 행사는 이용자의 법정대리인이나 위임을 받은 자 등
            대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙
            별지 제11호 서식에 따른 위임장을 제출하여야 합니다.
          </li>
          <li>
            개인정보 열람 및 처리정지 요구는 관련법령에 의하여 이용자의 권리가
            제한될 수 있습니다.
          </li>
          <li>
            개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집
            대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다. 또한
            개인정보 오류에 대한 정정을 요청한 경우에는 다른 법률에 따라
            개인정보의 제공을 요청 받는 경우가 아닌 한 정정을 완료하기 전까지
            당해 개인정보를 이용 또는 제공하지 않습니다. 만약 잘못된 개인정보를
            이미 제공한 경우에는 정정 처리 결과를 제3자에게 통지하여 정정이
            이루어지도록 하겠습니다.
          </li>
          <li>
            회사는 아동의 개인정보를 보호하기 위하여, 만 14세 미만의 아동의 경우
            회원가입 시 법정대리인 동의를 받고 있습니다. 법정대리인은 본 조에
            따라 언제든지 아동의 개인정보를 조회하거나 수정할 수 있으며, 서비스
            가입 해지를 요청할 수도 있습니다.
          </li>
        </ol>

        <p className="mobile:text-sm laptop:text-lg desktop:text-xl">
          ② 이용자는 아래의 내용에 따라 개인정보의 열람 및 정정, 동의의 철회,
          동의에 대한 거부권 행사, 탈퇴에 관한 권리를 행사할 수 있습니다.
        </p>

        <ol className="mobile:text-sm ml-8 list-decimal laptop:text-lg desktop:text-xl">
          <li>개인정보의 열람 및 정정 범위</li>
          <ul className="ml-8 list-disc">
            <li>회사가 보유하고 있는 이용자의 개인정보</li>
            <li>회사가 이용하거나 제3자에 제공한 개인정보</li>
            <li>개인정보의 수집, 이용, 제공 등의 동의 현황</li>
          </ul>

          <li>
            개인정보의 열람 · 정정 및 동의 철회, 광고성 정보 전송에 대한 동의
            거부권 행사 방법
          </li>
          <ul className="ml-8 list-disc">
            <li>
              이용자는 플랫폼에 있는 회사의 고객센터에 연락하여 동의 거부권을
              행사할 수 있습니다.
            </li>
            <li>
              고객센터는 홈페이지에 게시된 ‘문의하기’를 통하여 운영하고
              있습니다.
            </li>
            <li>
              고객센터의 운영시간은 아래와 같으며, 주말/공휴일에는 운영하지
              않습니다. [운영시간] 월요일~금요일: 10:30~17:30 점심시간 :
              12:30~14:00(평일)
            </li>
          </ul>

          <li>회원 탈퇴</li>
          <ul className="ml-8 list-disc">
            <li>
              이용자는 플랫폼 내에서 회사가 정한 절차에 따라 회원탈퇴를 할 수
              있습니다.
            </li>
          </ul>
        </ol>

        <p className="mobile:text-sm laptop:text-lg desktop:text-xl">
          ③ 이용자는 개인정보주체로서 아래와 같이 개인정보를 스스로 보호할
          의무가 있습니다.
        </p>
        <ol className="mobile:text-sm ml-8 list-decimal laptop:text-lg desktop:text-xl">
          <li>
            이용자는 개인정보를 항상 최신의 상태로 유지해야 하며, 고객이 입력한
            부정확한 정보로 인하여 발생한 문제의 책임은 이용자 자신에게
            있습니다.
          </li>
          <li>
            회사의 귀책사유가 없이 이메일, 비밀번호, 접근매체 등의
            양도·대여·분실이나 로그인 상태에서 이석(자리를 뜸) 등 이용자 본인의
            부주의나 관계법령에 의한 보안조치로 차단할 수 없는 방법이나 기술을
            사용한 해킹 등 회사가 상당한 주의를 기울였음에도 불구하고 통제할 수
            없는 인터넷 상의 문제 등으로 개인정보가 유출되어 발생한 문제에 대해
            회사는 책임을 지지 않습니다.
          </li>
          <li>
            이용자는 이메일, 비밀번호, 접근매체 등 개인정보가 유출되지 않도록
            주의해야 하고 제3자에게 양도하거나 대여할 수 없습니다. 이용자 본인의
            부주의로 인하여 발생한 손해에 대해서는 회사가 책임을 지지 않습니다.
          </li>
          <li>
            타인의 개인정보를 도용한 회원가입 또는 서비스 이용 시 이용자 자격
            상실과 함께 관련 법령에 따라 처벌될 수 있습니다.
          </li>
          <li>
            이용자는 회사의 개인정보보호정책에 따라 보안을 위해 비밀번호의
            주기적 변경 등과 같이 회사가 요청하는 사항에 협조할 의무가 있습니다.
          </li>
          <li>
            이용자는 본 방침과 개인정보에 관한 관련 법령을 준수하여야 합니다.
          </li>
        </ol>
        <p className="mobile:text-sm laptop:text-lg desktop:text-xl">
          ④ 기업교육 서비스 이용을 위해 생성된 계정 정보는 기업의 파기 요청이
          있는 경우, 계정 소유자에게 고지 없이 개인정보가 파기될 수 있습니다.
        </p>
        <h2 className="mobile:text-lg mb-2 mt-4 text-xl font-semibold laptop:text-2xl desktop:text-3xl">
          제5조 (개인정보의 제3자 제공)
        </h2>
        <p className="mobile:text-sm laptop:text-lg desktop:text-xl">
          ① 회사는 원칙적으로 이용자의 개인정보를 수집 및 이용목적 범위를 넘어
          제3자에게 제공하거나 외부에 공개하지 않습니다. 다만, 보다 나은 서비스
          제공을 위하여 이용자의 개인정보를 협력업체 등과 공유할 필요가 있는
          경우에는 제공받는 자, 제공 목적, 제공 정보항목, 이용 및 보유기간 등을
          이용자에게 고지하여 동의를 구합니다. 또한 법령의 규정에 의거하거나,
          수사목적으로 법령에서 정해진 절차와 방법에 따라 수사기관의 요구가 있는
          경우에는 이용자의 개인정보를 제공할 수 있습니다.
        </p>
        <p className="mobile:text-sm laptop:text-lg desktop:text-xl">
          ② 회사는 이용자의 개인정보를 회사가 제공하는 서비스 외의 용도로
          사용하거나 이용자의 동의 없이 제3자에게 제공하지 않습니다. 필요에
          의하여 제3자에게 제공할 경우에는 이용자에게 알리고 별도의 동의를
          받습니다. 다만, 다음 각 호의 경우에는 예외로 합니다.
        </p>
        <ul className="mobile:text-sm ml-8 list-disc laptop:text-lg desktop:text-xl">
          <li>
            가. 이용자가 회사의 이용약관을 위배하거나 서비스를 이용하여 타인에게
            피해를 주거나 미풍양속을 해치는 위법행위를 한 경우, 법적인 조치를
            취하기 위하여 개인정보를 공개해야 한다고 판단되는 경우
          </li>
          <li>
            나. 법령의 규정에 의거하거나, 수사목적으로 법령에서 정해진 절차와
            방법에 따라 수사기관의 요구가 있는 경우
          </li>
          <li>
            다. 통계작성, 학술연구, 시장조사, 정보제공 및 공지 안내 메일 발송의
            경우로서 특정 개인을 식별할 수 없는 형태로 제공되는 경우
          </li>
          <li>라. 이용자가 사전에 동의한 경우</li>
        </ul>

        <h2 className="mobile:text-lg mb-2 mt-4 text-xl font-semibold laptop:text-2xl desktop:text-3xl">
          제6조 (개인정보의 처리위탁)
        </h2>
        <p className="mobile:text-sm laptop:text-lg desktop:text-xl">
          ① 회사는 이용자에게 원활한 서비스 제공과 서비스 품질의 향상을 위하여
          이와 관련된 업무 일부를 외부업체에 위탁하여 수행할 수 있습니다. 회사는
          외부업체에게 개인정보의 처리업무를 위탁하는 경우, 계약서 등을 통하여
          개인정보보호 관련 법규의 준수, 개인정보에 관한 비밀유지, 제3자 제공에
          대한 금지, 사고 시의 책임 부담, 위탁기간, 처리 종료 후의 개인정보의
          파기 의무 등을 규정하고, 이를 준수하도록 관리, 감독하는 등 이용자의
          개인정보보호를 위한 조치를 이행합니다.
        </p>
        <p className="mobile:text-sm laptop:text-lg desktop:text-xl">
          ② 회사는 개인정보 처리위탁업무의 내용이나 수탁자가 변경될 경우, 지체
          없이 본 개인정보처리방침을 통하여 공개하고, 이로써 위탁에 대한 동의로
          갈음합니다.
        </p>
        <h2 className="mobile:text-lg mb-2 mt-4 text-xl font-semibold laptop:text-2xl desktop:text-3xl">
          제7조 (개인정보의 파기 절차 및 방법)
        </h2>

        <p className="mobile:text-sm laptop:text-lg desktop:text-xl">
          회사는 원칙적으로 이용자의 개인정보를 그 수집 및 이용 목적이 달성되면
          지체 없이 파기합니다.
        </p>

        <h2 className="mobile:text-lg mb-2 mt-4 text-xl font-semibold laptop:text-2xl desktop:text-3xl">
          제8조 (개인정보보호책임자 및 연락처)
        </h2>

        <p className="mobile:text-sm laptop:text-lg desktop:text-xl">
          회사는 개인정보에 대한 의견 수렴 및 불만 처리를 위하여 이를 담당하는
          개인정보보호책임자를 아래와 같이 지정하고 있습니다. 이용자가 회사의
          서비스를 이용하면서 발생하는 모든 개인정보보호에 대한 문의, 불만 처리,
          피해 구제 등 관련 민원을 개인정보보호책임자 혹은 담당 부서에 신고하실
          수 있습니다. 회사는 이용자들의 문의 및 신고에 대해 신속하게 답변 및
          처리해드릴 것입니다.
        </p>

        <ul className="mobile:text-sm ml-8 list-disc laptop:text-lg desktop:text-xl">
          <li>담당자 이름: 이체은</li>
          <li>직책: 대표</li>
          <li>이메일: deeptree00@gmail.com</li>
        </ul>

        <p className="mobile:text-sm laptop:text-lg desktop:text-xl">
          기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래의 기관에
          문의하시기 바랍니다.
        </p>

        <ul className="mobile:text-sm ml-8 list-disc laptop:text-lg desktop:text-xl">
          <li>1. 개인정보침해신고센터 (www.1336.or.kr / 국번없이 118)</li>
          <li>
            2. 정보보호마크인증위원회 (www.eprivacy.or.kr / 02-580-0533~4)
          </li>
          <li>
            3. 대검찰청 사이버범죄수사센터 (www.spo.go.kr/minwon / 국번 없이
            1301)
          </li>
          <li>4. 경찰청 사이버테러대응센터 (www.ctrc.go.kr / 02-392-0330)</li>
          <li>
            5. 개인정보분쟁조정위원회 (cyberbureau.police.go.kr / 1833-6972)
          </li>
        </ul>

        <h2 className="mobile:text-lg mb-2 mt-4 text-xl font-semibold laptop:text-2xl desktop:text-3xl">
          제9조 (고지의무)
        </h2>

        <p className="mobile:text-sm laptop:text-lg desktop:text-xl">
          회사는 현행 개인정보처리방침에 대한 내용 추가, 삭제 및 수정이 있을
          시에는 개정 최소 7일 전부터 플랫폼 내 공지사항을 통해 고지할 것입니다.
        </p>

        <h2 className="mobile:text-lg mb-2 mt-4 text-xl font-semibold laptop:text-2xl desktop:text-3xl">
          제10조 (기타)
        </h2>

        <p className="mobile:text-sm laptop:text-lg desktop:text-xl">
          회사가 제공하는 서비스에 링크되어 있는 웹페이지들이 개인정보를
          수집하는 행위에 대해서는 본 회사의 개인정보처리방침이 적용되지
          않습니다.
        </p>

        <p className="mobile:text-sm laptop:text-lg desktop:text-xl">
          공고일자: 2024년 09월 19일
          <br />
          시행일자: 2024년 09월 ~~일
        </p>
      </div>
    </section>
  );
};

export default PrivacyPage;
