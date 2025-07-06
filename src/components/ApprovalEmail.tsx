import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
} from "@react-email/components";
import type ApprovalEmailProps from "@/types/approvalEmailProps";
import { getUser } from "@/app/actions/user";

const main = {
  backgroundColor: "#FFFFFF",
  fontFamily: "sans-serif",
};

const container = {
  padding: "20px",
};

const header = {
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "20px",
};

const button = {
  backgroundColor: "#000000",
  color: "#FFFFFF",
  padding: "12px 20px",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "bold",
};

const footer = {
  marginTop: "40px",
  fontSize: "16px",
  color: "#000000",
};

export default async function ApprovalEmail({
  magicLink,
  opportunity,
}: ApprovalEmailProps) {
  const formattedDate = opportunity?.claimedOn
    ? opportunity.claimedOn.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      })
    : "an unknown date";
  const hours = opportunity?.estimatedTime ?? 0;
  const userRes = await getUser(opportunity?.claimedBy?.toString());
  const userName = userRes.user?.name ?? "An unknown user";

  return (
    <Html>
      <Head />
      <Preview>Approval request for volunteer hours</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={header}>Hello, {opportunity?.createdBy}</Text>
            <Text style={paragraph}>
              {userName} has requested you to approve {(hours / 60).toFixed(1)}{" "}
              volunteer hours for completing{" "}
              {opportunity?.title ?? "an unknown volunteer opportunity"}. It was
              initially claimed on {formattedDate}.
            </Text>
            <Button style={button} href={magicLink}>
              Approve volunteer hours
            </Button>
          </Section>
          <Text style={footer}>
            Email sent by SkillBridge volunteer@skillbridge.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
