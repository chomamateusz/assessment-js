/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

// I am no fun of this eslint rules and especially "Try to avoid introducing local variables".
// I prefer to write more retable code using return in function body
// line breaks and quite lot of (properly named) local vars.
// Last function is written as I prefer - no one-liners, clearly described vars and return ;)

exports.stripPrivateProperties = (excludedProps, array) => (
  array.map(object => (
    Object.fromEntries(Object.entries(object).filter(([key]) => !excludedProps.includes(key)))))
);
exports.excludeByProperty = (excludedProp, array) => (
  array
    .filter(object => !Object.prototype.hasOwnProperty.call(object, excludedProp))
);
exports.sumDeep = array => array
  .map(object => ({
    objects: (
      object.objects
        .reduce(
          (r, obj) => r + ((obj && obj.val) || 0),
          0,
        )
    ),
  }));
exports.applyStatusColor = (colors, statuses) => (
  statuses
    .filter(statusObject => Object
      .entries(colors)
      .find(([, colorStatuses]) => colorStatuses.includes(statusObject.status)))
    .map(statusObject => ({
      ...statusObject,
      color: Object
        .entries(colors)
        .find(([, colorStatuses]) => colorStatuses.includes(statusObject.status))[0],
    }))
);
exports.createGreeting = (greet, greeting) => name => greet(greeting, name);
exports.setDefaults = defaults => object => Object.keys(defaults).reduce(
  (r, requiredProp) => (Object.prototype.hasOwnProperty.call(object, requiredProp) ?
    { ...r, [requiredProp]: object[requiredProp] }
    :
    { ...r, [requiredProp]: defaults[requiredProp] })
  ,
  object,
);
exports.fetchUserByNameAndUsersCompany = async (userName, services) => {
  const users = await services.fetchUsers();
  const user = users.find(({ name }) => name === userName);

  if (!user) {
    // @TODO reject with error
    return Promise.reject();
  }

  const [company, status] = await Promise.all([
    services.fetchCompanyById(user.companyId),
    services.fetchStatus(),
  ]);

  return { user, company, status };
};
