import type { QueryResolvers, MutationResolvers } from "types/graphql";

import { db } from "src/lib/db";

export const settings: QueryResolvers["settings"] = () => {
  return db.setting.findMany();
};

export const setting: QueryResolvers["setting"] = ({ id }) => {
  return db.setting.findUnique({
    where: { id },
  });
};

export const createSetting: MutationResolvers["createSetting"] = ({
  input,
}) => {
  return db.setting.create({
    data: input,
  });
};

export const updateSetting: MutationResolvers["updateSetting"] = ({
  id,
  input,
}) => {
  return db.setting.update({
    data: input,
    where: { id },
  });
};

export const deleteSetting: MutationResolvers["deleteSetting"] = ({ id }) => {
  return db.setting.delete({
    where: { id },
  });
};

export const settingByKey: QueryResolvers["settingByKey"] = ({ key }) => {
  return db.setting.findFirst({
    where: { key },
  });
};
