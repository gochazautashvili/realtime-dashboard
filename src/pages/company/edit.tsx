import CustomAvatar from "@/components/custom-avatar";
import SelectOptionWithAvatar from "@/components/select-option-avatar";
import {
  businessTypeOptions,
  companySizeOptions,
  industryOptions,
} from "@/constants";
import { UPDATE_COMPANY_MUTATION } from "@/graphql/mutations";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import { UsersSelectQuery } from "@/graphql/types";
import { getNameInitials } from "@/utilities";
import { Edit as EditForm, useForm, useSelect } from "@refinedev/antd";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import { CompanyContactsTable } from "./contact-table";

const Edit = () => {
  const { saveButtonProps, formProps, formLoading, query } = useForm({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_COMPANY_MUTATION,
    },
  });

  const { selectProps, query: selectQuery } = useSelect<
    GetFieldsFromList<UsersSelectQuery>
  >({
    resource: "users",
    optionLabel: "name",
    pagination: {
      mode: "off",
    },
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });

  const { avatarUrl, name } = query?.data?.data || {};

  return (
    <Row gutter={[32, 32]}>
      <Col xs={24} xl={12}>
        <EditForm
          isLoading={formLoading}
          saveButtonProps={saveButtonProps}
          breadcrumb={false}
        >
          <Form {...formProps} layout="vertical">
            <CustomAvatar
              shape="square"
              src={avatarUrl}
              name={getNameInitials(name || "")}
              style={{ width: 96, height: 96, marginBottom: "24px" }}
            />

            <Form.Item
              label="Sales owner"
              name="salesOwnerId"
              initialValue={formProps?.initialValues?.salesOwner?.id}
            >
              <Select
                {...selectProps}
                options={
                  selectQuery.data?.data.map((user) => ({
                    value: user.id,
                    label: (
                      <SelectOptionWithAvatar
                        name={user.name}
                        avatarUrl={user.avatarUrl ?? undefined}
                      />
                    ),
                  })) ?? []
                }
                placeholder="Place select a sales owner"
              />
            </Form.Item>
            <Form.Item>
              <Select options={companySizeOptions} />
            </Form.Item>
            <Form.Item>
              <InputNumber
                autoFocus
                addonBefore="$"
                min={0}
                placeholder="0.00"
              />
            </Form.Item>
            <Form.Item label="Industry">
              <Select options={industryOptions} />
            </Form.Item>
            <Form.Item label="Business type">
              <Select options={businessTypeOptions} />
            </Form.Item>
            <Form.Item label="County" name="country">
              <Input placeholder="Country" />
            </Form.Item>
            <Form.Item label="Website" name="website">
              <Input placeholder="Website" />
            </Form.Item>
          </Form>
        </EditForm>
      </Col>
      <Col xs={24} xl={12}>
        <CompanyContactsTable />
      </Col>
    </Row>
  );
};

export default Edit;
