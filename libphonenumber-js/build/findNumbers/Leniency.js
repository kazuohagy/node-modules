"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containsMoreThanOneSlashInNationalNumber = containsMoreThanOneSlashInNationalNumber;
exports["default"] = void 0;

var _validate_ = _interopRequireDefault(require("../validate_"));

var _parseDigits = _interopRequireDefault(require("../helpers/parseDigits"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Leniency when finding potential phone numbers in text segments
 * The levels here are ordered in increasing strictness.
 */
var _default = {
  /**
   * Phone numbers accepted are "possible", but not necessarily "valid".
   */
  POSSIBLE: function POSSIBLE(number, candidate, metadata) {
    return true;
  },

  /**
   * Phone numbers accepted are "possible" and "valid".
   * Numbers written in national format must have their national-prefix
   * present if it is usually written for a number of this type.
   */
  VALID: function VALID(number, candidate, metadata) {
    if (!(0, _validate_["default"])(number, undefined, metadata) || !containsOnlyValidXChars(number, candidate.toString(), metadata)) {
      return false;
    } // Skipped for simplicity.
    // return isNationalPrefixPresentIfRequired(number, metadata)


    return true;
  },

  /**
   * Phone numbers accepted are "valid" and
   * are grouped in a possible way for this locale. For example, a US number written as
   * "65 02 53 00 00" and "650253 0000" are not accepted at this leniency level, whereas
   * "650 253 0000", "650 2530000" or "6502530000" are.
   * Numbers with more than one '/' symbol in the national significant number
   * are also dropped at this level.
   *
   * Warning: This level might result in lower coverage especially for regions outside of
   * country code "+1". If you are not sure about which level to use,
   * email the discussion group libphonenumber-discuss@googlegroups.com.
   */
  STRICT_GROUPING: function STRICT_GROUPING(number, candidate, metadata, regExpCache) {
    var candidateString = candidate.toString();

    if (!(0, _validate_["default"])(number, undefined, metadata) || !containsOnlyValidXChars(number, candidateString, metadata) || containsMoreThanOneSlashInNationalNumber(number, candidateString) || !isNationalPrefixPresentIfRequired(number, metadata)) {
      return false;
    }

    return checkNumberGroupingIsValid(number, candidate, metadata, allNumberGroupsRemainGrouped, regExpCache);
  },

  /**
   * Phone numbers accepted are {@linkplain PhoneNumberUtil#isValidNumber(PhoneNumber) valid} and
   * are grouped in the same way that we would have formatted it, or as a single block. For
   * example, a US number written as "650 2530000" is not accepted at this leniency level, whereas
   * "650 253 0000" or "6502530000" are.
   * Numbers with more than one '/' symbol are also dropped at this level.
   * <p>
   * Warning: This level might result in lower coverage especially for regions outside of country
   * code "+1". If you are not sure about which level to use, email the discussion group
   * libphonenumber-discuss@googlegroups.com.
   */
  EXACT_GROUPING: function EXACT_GROUPING(number, candidate, metadata, regExpCache) {
    var candidateString = candidate.toString();

    if (!(0, _validate_["default"])(number, undefined, metadata) || !containsOnlyValidXChars(number, candidateString, metadata) || containsMoreThanOneSlashInNationalNumber(number, candidateString) || !isNationalPrefixPresentIfRequired(number, metadata)) {
      return false;
    }

    return checkNumberGroupingIsValid(number, candidate, metadata, allNumberGroupsAreExactlyPresent, regExpCache);
  }
};
exports["default"] = _default;

function containsOnlyValidXChars(number, candidate, metadata) {
  // The characters 'x' and 'X' can be (1) a carrier code, in which case they always precede the
  // national significant number or (2) an extension sign, in which case they always precede the
  // extension number. We assume a carrier code is more than 1 digit, so the first case has to
  // have more than 1 consecutive 'x' or 'X', whereas the second case can only have exactly 1 'x'
  // or 'X'. We ignore the character if it appears as the last character of the string.
  for (var index = 0; index < candidate.length - 1; index++) {
    var charAtIndex = candidate.charAt(index);

    if (charAtIndex === 'x' || charAtIndex === 'X') {
      var charAtNextIndex = candidate.charAt(index + 1);

      if (charAtNextIndex === 'x' || charAtNextIndex === 'X') {
        // This is the carrier code case, in which the 'X's always precede the national
        // significant number.
        index++;

        if (util.isNumberMatch(number, candidate.substring(index)) != MatchType.NSN_MATCH) {
          return false;
        } // This is the extension sign case, in which the 'x' or 'X' should always precede the
        // extension number.

      } else if ((0, _parseDigits["default"])(candidate.substring(index)) !== number.ext) {
        return false;
      }
    }
  }

  return true;
}

function isNationalPrefixPresentIfRequired(number, _metadata) {
  // First, check how we deduced the country code. If it was written in international format, then
  // the national prefix is not required.
  if (number.getCountryCodeSource() != 'FROM_DEFAULT_COUNTRY') {
    return true;
  }

  var phoneNumberRegion = util.getRegionCodeForCountryCode(number.getCountryCode());
  var metadata = util.getMetadataForRegion(phoneNumberRegion);

  if (metadata == null) {
    return true;
  } // Check if a national prefix should be present when formatting this number.


  var nationalNumber = util.getNationalSignificantNumber(number);
  var formatRule = util.chooseFormattingPatternForNumber(metadata.numberFormats(), nationalNumber); // To do this, we check that a national prefix formatting rule was present
  // and that it wasn't just the first-group symbol ($1) with punctuation.

  if (formatRule && formatRule.getNationalPrefixFormattingRule().length > 0) {
    if (formatRule.getNationalPrefixOptionalWhenFormatting()) {
      // The national-prefix is optional in these cases, so we don't need to check if it was
      // present.
      return true;
    }

    if (PhoneNumberUtil.formattingRuleHasFirstGroupOnly(formatRule.getNationalPrefixFormattingRule())) {
      // National Prefix not needed for this number.
      return true;
    } // Normalize the remainder.


    var rawInputCopy = PhoneNumberUtil.normalizeDigitsOnly(number.getRawInput()); // Check if we found a national prefix and/or carrier code at the start of the raw input, and
    // return the result.

    return util.maybeStripNationalPrefixAndCarrierCode(rawInputCopy, metadata, null);
  }

  return true;
}

function containsMoreThanOneSlashInNationalNumber(number, candidate) {
  var firstSlashInBodyIndex = candidate.indexOf('/');

  if (firstSlashInBodyIndex < 0) {
    // No slashes, this is okay.
    return false;
  } // Now look for a second one.


  var secondSlashInBodyIndex = candidate.indexOf('/', firstSlashInBodyIndex + 1);

  if (secondSlashInBodyIndex < 0) {
    // Only one slash, this is okay.
    return false;
  } // If the first slash is after the country calling code, this is permitted.


  var candidateHasCountryCode = number.getCountryCodeSource() === CountryCodeSource.FROM_NUMBER_WITH_PLUS_SIGN || number.getCountryCodeSource() === CountryCodeSource.FROM_NUMBER_WITHOUT_PLUS_SIGN;

  if (candidateHasCountryCode && PhoneNumberUtil.normalizeDigitsOnly(candidate.substring(0, firstSlashInBodyIndex)) === String(number.getCountryCode())) {
    // Any more slashes and this is illegal.
    return candidate.slice(secondSlashInBodyIndex + 1).indexOf('/') >= 0;
  }

  return true;
}

function checkNumberGroupingIsValid(number, candidate, metadata, checkGroups, regExpCache) {
  var normalizedCandidate = normalizeDigits(candidate, true
  /* keep non-digits */
  );
  var formattedNumberGroups = getNationalNumberGroups(metadata, number, null);

  if (checkGroups(metadata, number, normalizedCandidate, formattedNumberGroups)) {
    return true;
  } // If this didn't pass, see if there are any alternate formats that match, and try them instead.


  var alternateFormats = MetadataManager.getAlternateFormatsForCountry(number.getCountryCode());
  var nationalSignificantNumber = util.getNationalSignificantNumber(number);

  if (alternateFormats) {
    for (var _iterator = alternateFormats.numberFormats(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var alternateFormat = _ref;

      if (alternateFormat.leadingDigitsPatterns().length > 0) {
        // There is only one leading digits pattern for alternate formats.
        var leadingDigitsRegExp = regExpCache.getPatternForRegExp('^' + alternateFormat.leadingDigitsPatterns()[0]);

        if (!leadingDigitsRegExp.test(nationalSignificantNumber)) {
          // Leading digits don't match; try another one.
          continue;
        }
      }

      formattedNumberGroups = getNationalNumberGroups(metadata, number, alternateFormat);

      if (checkGroups(metadata, number, normalizedCandidate, formattedNumberGroups)) {
        return true;
      }
    }
  }

  return false;
}
/**
 * Helper method to get the national-number part of a number, formatted without any national
 * prefix, and return it as a set of digit blocks that would be formatted together following
 * standard formatting rules.
 */


function getNationalNumberGroups(metadata, number, formattingPattern) {
  if (formattingPattern) {
    // We format the NSN only, and split that according to the separator.
    var nationalSignificantNumber = util.getNationalSignificantNumber(number);
    return util.formatNsnUsingPattern(nationalSignificantNumber, formattingPattern, 'RFC3966', metadata).split('-');
  } // This will be in the format +CC-DG1-DG2-DGX;ext=EXT where DG1..DGX represents groups of digits.


  var rfc3966Format = formatNumber(number, 'RFC3966', metadata); // We remove the extension part from the formatted string before splitting it into different
  // groups.

  var endIndex = rfc3966Format.indexOf(';');

  if (endIndex < 0) {
    endIndex = rfc3966Format.length;
  } // The country-code will have a '-' following it.


  var startIndex = rfc3966Format.indexOf('-') + 1;
  return rfc3966Format.slice(startIndex, endIndex).split('-');
}

function allNumberGroupsAreExactlyPresent(metadata, number, normalizedCandidate, formattedNumberGroups) {
  var candidateGroups = normalizedCandidate.split(NON_DIGITS_PATTERN); // Set this to the last group, skipping it if the number has an extension.

  var candidateNumberGroupIndex = number.hasExtension() ? candidateGroups.length - 2 : candidateGroups.length - 1; // First we check if the national significant number is formatted as a block.
  // We use contains and not equals, since the national significant number may be present with
  // a prefix such as a national number prefix, or the country code itself.

  if (candidateGroups.length == 1 || candidateGroups[candidateNumberGroupIndex].contains(util.getNationalSignificantNumber(number))) {
    return true;
  } // Starting from the end, go through in reverse, excluding the first group, and check the
  // candidate and number groups are the same.


  var formattedNumberGroupIndex = formattedNumberGroups.length - 1;

  while (formattedNumberGroupIndex > 0 && candidateNumberGroupIndex >= 0) {
    if (candidateGroups[candidateNumberGroupIndex] !== formattedNumberGroups[formattedNumberGroupIndex]) {
      return false;
    }

    formattedNumberGroupIndex--;
    candidateNumberGroupIndex--;
  } // Now check the first group. There may be a national prefix at the start, so we only check
  // that the candidate group ends with the formatted number group.


  return candidateNumberGroupIndex >= 0 && (0, _util.endsWith)(candidateGroups[candidateNumberGroupIndex], formattedNumberGroups[0]);
}

function allNumberGroupsRemainGrouped(metadata, number, normalizedCandidate, formattedNumberGroups) {
  var fromIndex = 0;

  if (number.getCountryCodeSource() !== CountryCodeSource.FROM_DEFAULT_COUNTRY) {
    // First skip the country code if the normalized candidate contained it.
    var countryCode = String(number.getCountryCode());
    fromIndex = normalizedCandidate.indexOf(countryCode) + countryCode.length();
  } // Check each group of consecutive digits are not broken into separate groupings in the
  // {@code normalizedCandidate} string.


  for (var i = 0; i < formattedNumberGroups.length; i++) {
    // Fails if the substring of {@code normalizedCandidate} starting from {@code fromIndex}
    // doesn't contain the consecutive digits in formattedNumberGroups[i].
    fromIndex = normalizedCandidate.indexOf(formattedNumberGroups[i], fromIndex);

    if (fromIndex < 0) {
      return false;
    } // Moves {@code fromIndex} forward.


    fromIndex += formattedNumberGroups[i].length();

    if (i == 0 && fromIndex < normalizedCandidate.length()) {
      // We are at the position right after the NDC. We get the region used for formatting
      // information based on the country code in the phone number, rather than the number itself,
      // as we do not need to distinguish between different countries with the same country
      // calling code and this is faster.
      var region = util.getRegionCodeForCountryCode(number.getCountryCode());

      if (util.getNddPrefixForRegion(region, true) != null && Character.isDigit(normalizedCandidate.charAt(fromIndex))) {
        // This means there is no formatting symbol after the NDC. In this case, we only
        // accept the number if there is no formatting symbol at all in the number, except
        // for extensions. This is only important for countries with national prefixes.
        var nationalSignificantNumber = util.getNationalSignificantNumber(number);
        return (0, _util.startsWith)(normalizedCandidate.slice(fromIndex - formattedNumberGroups[i].length), nationalSignificantNumber);
      }
    }
  } // The check here makes sure that we haven't mistakenly already used the extension to
  // match the last group of the subscriber number. Note the extension cannot have
  // formatting in-between digits.


  return normalizedCandidate.slice(fromIndex).contains(number.getExtension());
}
//# sourceMappingURL=Leniency.js.map